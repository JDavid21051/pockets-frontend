/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/29/2026
 * Module name:  init-accounts-state.const.ts
 * File name:    init-accounts-state.const
 * IDE:          WebStorm
 */

import type {
  AccountsListModel,
  AccountsStoreStateModel,
} from '@/domain/models/accounts/accounts.model';
import { MatTableDataSource } from '@angular/material/table';

export const initAccountsStateConst: AccountsStoreStateModel = {
  listLoading: true,
  accounts: [],
  dataTableSource: new MatTableDataSource<AccountsListModel>([]),
};
