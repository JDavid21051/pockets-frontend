/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/30/2026
 * Module name:  login.port.ts
 * File name:    login.port
 * IDE:          WebStorm
 */

import type { Observable } from 'rxjs';
import type { LoginDto, LoginResponse } from '@/domain/models/auth/login.model';

export interface LoginPort {
  readonly login: (params: LoginDto) => Observable<LoginResponse>;
}
