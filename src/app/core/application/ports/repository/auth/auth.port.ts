/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/30/2026
 * Module name:  auth.port.ts
 * File name:    login.port
 * IDE:          WebStorm
 */

import type { Observable } from 'rxjs';
import type { LoginDto, LoginResponse, LogoutDto } from '@/domain/models/auth/login.model';

export interface AuthPort {
  readonly login: (params: LoginDto) => Observable<LoginResponse>;
  readonly logout: (param: LogoutDto) => Observable<boolean>;
}
