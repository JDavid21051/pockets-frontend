/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/29/2026
 * Module name:  auth-storage-key.itoken.ts
 * File name:    auth-storage-key.itoken
 * IDE:          WebStorm
 */

import { InjectionToken } from '@angular/core';

export const AUTH_STORAGE_KEY = new InjectionToken<string>('AUTH_STORAGE_KEY');
