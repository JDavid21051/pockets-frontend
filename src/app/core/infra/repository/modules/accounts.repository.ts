/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/27/2026
 * Module name:  accounts.repository.ts
 * File name:    accounts.repository
 * IDE:          WebStorm
 */

import { inject, Injectable } from '@angular/core';
import { URL_SERVICES } from '@/infra/config/urls-services.config';
import { CoreHttpClientService } from '@/infra/http/core-http-client.service';
import type { AccountsPort } from '@/application/ports/repository/accounts/accounts.port';
import type {
  AccountCreateDto,
  AccountCreateResponse,
  AccountsListModel,
} from '@/domain/models/accounts/accounts.model';

@Injectable({
  providedIn: 'root',
})
export class AccountsRepository implements AccountsPort {
  private readonly urls = URL_SERVICES.accounts;
  private readonly http = inject(CoreHttpClientService);

  list() {
    return this.http.get<AccountsListModel[]>(this.urls.base + this.urls.list);
  }

  create(dto: AccountCreateDto) {
    return this.http.post<AccountCreateResponse>(this.urls.base + this.urls.create, dto);
  }
}
