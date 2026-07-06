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
import type { FormControl } from '@angular/forms';
import type { SummaryListModel } from '@/domain/models/app/summary-list.model';
import type { HeadlinesModelList } from '@/domain/models/headlines/headlines.model';
import type { AccountCurrencyEnum, AccountTypeEnum } from '@/domain/enums/accounts/accounts.enums';
import type { MatDialogRef } from '@angular/material/dialog';
import type { AccountFormContainer } from '@/features/admin/accounts/account-form-container/account-form-container';

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
  dialogRef: MatDialogRef<AccountFormContainer, boolean> | null;
  dataTableSource: MatTableDataSource<AccountsListModel>;
}

export interface AccountsFormControls {
  accountNumber: FormControl<string>;
  type: FormControl<SummaryListModel<AccountTypeEnum> | null>;
  bankName: FormControl<string>;
  bankLocation: FormControl<string>;
  enabled: FormControl<boolean>;
  balance: FormControl<number>;
  currency: FormControl<SummaryListModel<AccountCurrencyEnum> | null>;
  tae: FormControl<number>;
  openAt: FormControl<string>;
  headline: FormControl<HeadlinesModelList | null>;
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
