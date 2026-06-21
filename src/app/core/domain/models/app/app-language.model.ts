/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/20/2026
 * Module name:  app-language.model.ts
 * File name:    app-language.model
 * IDE:          WebStorm
 */

import type { AllowedLanguagesEnum } from '@/domain/enums/allowed-languages.enum';

export interface LanguageModelMenu {
  readonly key: AllowedLanguagesEnum;
  readonly label: string;
  readonly tooltip: string;
}
