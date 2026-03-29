/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/23/2026
 * Module name:  modules-config.token.ts
 * File name:    modules-config.token
 * IDE:          WebStorm
 */

import { InjectionToken } from '@angular/core';
import type { ModulesConfigModel } from '@/domain/models/app/modules-config.model';

/**
 * Injection Token config for modules libs
 */
export const KRIH_MODULES_CONFIG_TOKEN = new InjectionToken<ModulesConfigModel>(
  'KRIH_MODULES_CONFIG_TOKEN',
);
