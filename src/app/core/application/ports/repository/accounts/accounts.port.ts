/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/27/2026
 * Module name:  accounts.port.ts
 * File name:    accounts.port
 * IDE:          WebStorm
 */

import type { Observable } from 'rxjs';
import type {
  AccountCreateDto,
  AccountCreateResponse,
  AccountsListModel,
} from '@/domain/models/accounts/accounts.model';

export interface AccountsPort {
  readonly list: () => Observable<AccountsListModel[]>;
  readonly create: (dto: AccountCreateDto) => Observable<AccountCreateResponse>;
}
