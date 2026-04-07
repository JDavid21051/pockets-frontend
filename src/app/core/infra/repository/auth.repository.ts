/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/23/2026
 * Module name:  auth.repository.ts
 * File name:    login.repository
 * IDE:          WebStorm
 */

import { inject, Injectable } from '@angular/core';
import { CoreHttpClientService } from '@/infra/http/core-http-client.service';
import { URL_SERVICES } from '@/infra/config/urls-services.config';
import type { LoginDto, LoginResponse, LogoutDto } from '@/domain/models/auth/login.model';
import type { AuthPort } from '@/application/ports/repository/auth/auth.port';
import { HttpContext } from '@angular/common/http';
import { AUTH_REQUEST_CONTEXT } from '@/infra/http/context-tokens/auth-request.context-token';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository implements AuthPort {
  private readonly urls = URL_SERVICES.auth;
  private readonly http = inject(CoreHttpClientService);

  login(dto: LoginDto) {
    return this.http.post<LoginResponse>(this.urls.base + this.urls.login, dto);
  }

  logout(payload: LogoutDto) {
    const authContext = new HttpContext().set(AUTH_REQUEST_CONTEXT, false);

    return this.http.post<boolean>(this.urls.base + this.urls.logout, payload, {
      context: authContext,
    });
  }
}
