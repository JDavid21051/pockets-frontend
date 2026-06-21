/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/20/2026
 * Module name:  app-menu-lang.const.ts
 * File name:    app-menu-lang.const
 * IDE:          WebStorm
 */

import type { LanguageModelMenu } from '@/domain/models/app/app-language.model';
import { AllowedLanguagesEnum } from '@/domain/enums/allowed-languages.enum';

export const APP_MENU_LANG: LanguageModelMenu[] = [
  {
    key: AllowedLanguagesEnum.es,
    label: 'settings.language.es.name',
    tooltip: 'settings.language.es.tooltip',
  },
  {
    key: AllowedLanguagesEnum.en,
    label: 'settings.language.en.name',
    tooltip: 'settings.language.en.tooltip',
  },
];
