/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/22/2026
 * Module name:  app-menu-theme.const.ts
 * File name:    app-menu-theme.const
 * IDE:          WebStorm
 */

import type { ThemeMenuItemModel } from '@/domain/models/app/app-theme.model';
import { AllowedThemeEnum } from '@/domain/enums/allowed-theme.enum';

export const APP_MENU_THEME_CONST_MAP: Record<AllowedThemeEnum, ThemeMenuItemModel> = {
  [AllowedThemeEnum.lightBase]: {
    themeId: AllowedThemeEnum.lightBase,
    name: 'light blue',
    color: 'bg-[var(--sys-light-blue)]',
    cssClass: 'light_mode',
  },
  [AllowedThemeEnum.darkViolet]: {
    themeId: AllowedThemeEnum.darkViolet,
    name: 'dark violet',
    color: 'bg-[var(--sys-dark-violet)]',
    cssClass: 'violet_mode',
  },
  [AllowedThemeEnum.lightRose]: {
    themeId: AllowedThemeEnum.lightRose,
    name: 'light rose',
    color: 'bg-[var(--sys-light-rose)]',
    cssClass: 'rose_mode',
  },
  [AllowedThemeEnum.darkCyan]: {
    themeId: AllowedThemeEnum.darkCyan,
    name: 'dark magenta',
    color: 'bg-[var(--sys-dark-cyan)]',
    cssClass: 'cyan_mode',
  },
};

export const APP_MENU_THEME_CONST: ThemeMenuItemModel[] = Object.values(
  APP_MENU_THEME_CONST_MAP,
).map((item): ThemeMenuItemModel => item);
