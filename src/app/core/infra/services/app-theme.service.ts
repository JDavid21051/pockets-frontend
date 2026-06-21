/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/21/2026
 * Module name:  app-theme.service.ts
 * File name:    app-theme.service
 * IDE:          WebStorm
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  currentTheme = 'light';
  sometimes = '22';

  setupThem() {
    console.log('cambiar tema');
    console.log({ sometimes: this.sometimes });
  }
}
