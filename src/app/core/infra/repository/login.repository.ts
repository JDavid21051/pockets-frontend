/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/23/2026
 * Module name:  login.repository.ts
 * File name:    login.repository
 * IDE:          WebStorm
 */

import { inject, Injectable } from '@angular/core';
import { CoreHttpClientService } from '@/infra/http/core-http-client.service';
import { URL_SERVICES } from '@/infra/config/urls-services.config';
import type { LoginDto, LoginResponse } from '@/domain/models/auth/login.model';
import type { LoginPort } from '@/application/ports/login.port';

@Injectable({
  providedIn: 'root',
})
export class LoginRepository implements LoginPort {
  private readonly urls = URL_SERVICES.auth;
  private readonly http = inject(CoreHttpClientService);

  login(dto: LoginDto) {
    return this.http.post<LoginResponse>(this.urls.base + this.urls.login, dto);
  }
}
