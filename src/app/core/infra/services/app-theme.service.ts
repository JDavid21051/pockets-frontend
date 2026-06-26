/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/21/2026
 * Module name:  app-theme.service.ts
 * File name:    app-theme.service
 * IDE:          WebStorm
 */

import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';
import type { AllowedThemeEnum } from '@/domain/enums/allowed-theme.enum';
import { THEME_CONFIG_STORAGE } from '@/infra/itoken/theme-config-storage-key.itoken';
import { SecureStorage } from '@/infra/class/secure-storage.classs';
import { APP_MENU_THEME_CONST, APP_MENU_THEME_CONST_MAP } from '@/infra/const/app-menu-theme.const';
import { SnackBarService } from '@/infra/services/app-snack-bar.service';
import { NATIVE_WINDOW } from '@/infra/itoken/native-windows.itokens';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  private readonly documentRef = inject(DOCUMENT);
  private readonly windowRef = inject(NATIVE_WINDOW);
  private readonly snackService = inject(SnackBarService);
  private readonly themeConfig = inject(THEME_CONFIG_STORAGE);
  private readonly storage = new SecureStorage();
  readonly currentTheme = signal<AllowedThemeEnum>(this.#loadTheme());

  constructor() {
    this.currentTheme.set(this.#loadTheme());
    effect(() => this.#applyTheme(this.currentTheme()));
  }

  #loadTheme(): AllowedThemeEnum {
    try {
      const stored = this.storage.getItem(this.themeConfig.storage) as AllowedThemeEnum;
      const matchTheme = APP_MENU_THEME_CONST.some((them) => them.themeId === stored);

      if (matchTheme) return stored;
      const isSystemDark =
        typeof this.windowRef !== 'undefined' &&
        this.windowRef.matchMedia?.('(prefers-color-scheme: dark)').matches;
      if (isSystemDark) return this.themeConfig.darkFallback;

      return this.themeConfig.default;
    } catch {
      return this.themeConfig.default;
    }
  }

  #applyTheme(theme: AllowedThemeEnum): void {
    const { classList } = this.documentRef.body;
    classList.remove(...APP_MENU_THEME_CONST.map((item) => item.cssClass));
    classList.add(APP_MENU_THEME_CONST_MAP[theme].cssClass);
  }

  setTheme(theme: AllowedThemeEnum): void {
    this.currentTheme.set(theme);
    try {
      this.storage.setItem(this.themeConfig.storage, theme);
    } catch (e) {
      this.snackService.showError(String(e));
    }
  }
}
