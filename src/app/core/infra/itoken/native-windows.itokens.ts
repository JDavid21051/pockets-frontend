/*
 * Developed by CQ Inversiones SAS. Copyright (c) 2026. All rights reserved.
 * Desarrollado por CQ Inversiones SAS. Copyright (c) 2026. Todos los derechos reservados.
 */

/*
* Project:      biodiv-frontend
* Developed by: Juan David Pelaez Cumbe
* Date:         1/26/2026 - 09:45
* Module name:  tokens
* File name:    native-windows.tokens.ts
* IDE:          WebStorm
*/

import { InjectionToken } from '@angular/core';

export const NATIVE_WINDOW = new InjectionToken<Window>('window', {
  providedIn: 'root',
  factory: () => window,
});
