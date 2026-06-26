/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/22/2026
 * Module name:  theme-storage-key.itoken.ts
 * File name:    theme-storage-key.itoken
 * IDE:          WebStorm
 */

import { InjectionToken } from '@angular/core';
import type { ThemeConfigIToken } from '@/domain/models/app/app-theme.model';

export const THEME_CONFIG_STORAGE = new InjectionToken<ThemeConfigIToken>('THEME_STORAGE_KEY');
