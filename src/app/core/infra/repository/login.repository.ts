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
import type { LoginDto } from '@/domain/models/auth/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginRepository {
  private readonly urls = URL_SERVICES.auth;
  private readonly http = inject(CoreHttpClientService);

  login<TResponse = string>(param: LoginDto) {
    return this.http.post<TResponse>(this.urls.base + this.urls.login, param);
  }
}
