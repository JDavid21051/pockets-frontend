/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/27/2026
 * Module name:  accounts.model.ts
 * File name:    accounts.model
 * IDE:          WebStorm
 */

import type { MatTableDataSource } from '@angular/material/table';
import type { UUID } from '@/domain/types/types';

export interface AccountsListModel {
  id: UUID;
  status: boolean;
  account_type: number;
  bank: string;
  balance: string;
  currency: number;
  account_location: string;
}

export interface AccountsStoreStateModel {
  listLoading: boolean;
  accounts: AccountsListModel[];
  dataTableSource: MatTableDataSource<AccountsListModel>;
}

/**
 {
 "id": "847b3381-630d-4c96-a0d5-c5a79a71cef7",
 "status": true,
 "account_number": "354SAS131212",
 "account_type": 0,
 "bank": "Bancolombia",
 "balance": "0.00",
 "currency": 0,
 "open_at": "2025-06-15T00:00:00.000Z",
 "tea": "0.00",
 "account_location": "Neiva",
 "headline_id": "ce6cb95b-f590-453b-b2cc-b637af8f6277",
 "created_at": "2025-08-18T21:01:08.000Z"
 },
 */
