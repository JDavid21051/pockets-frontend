/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/22/2026
 * Module name:  app-theme-menu.model.ts
 * File name:    app-theme-menu.model
 * IDE:          WebStorm
 */

import type { AllowedThemeEnum } from '@/domain/enums/allowed-theme.enum';

export interface ThemeMenuItemModel {
  themeId: AllowedThemeEnum;
  name: string;
  cssClass: string;
  color: string;
}

export interface ThemeConfigIToken {
  readonly storage: string;
  readonly default: AllowedThemeEnum;
  readonly darkFallback: AllowedThemeEnum;
}
