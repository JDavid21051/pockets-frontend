/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/29/2026
 * Module name:  accounts.store.ts
 * File name:    accounts.store
 * IDE:          WebStorm
 */

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initAccountsStateConst } from '@/infra/const/account/init-accounts-state.const';
import { inject } from '@angular/core';
import { SnackBarService } from '@/infra/services/app-snack-bar.service';
import { TranslateService } from '@ngx-translate/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { handleRxResponse } from '@/infra/parsers/handle-rx-response';
import { AccountsRepository } from '@/infra/repository/modules/accounts.repository';
import type { MatDialogRef } from '@angular/material/dialog';
import type { AccountFormContainer } from '@/features/admin/accounts/account-form-container/account-form-container';
import type { AccountCreateDto, AccountsListModel } from '@/domain/models/accounts/accounts.model';

export const AccountsStore = signalStore(
  { providedIn: 'root' },
  withState(initAccountsStateConst),
  withMethods(
    (
      store,
      snackService = inject(SnackBarService),
      translate = inject(TranslateService),
      accountsRepository = inject(AccountsRepository),
    ) => {
      const getAccounts = rxMethod<void>(($) => {
        patchState(store, { listLoading: true });
        return $.pipe(
          switchMap(() =>
            accountsRepository.list().pipe(
              handleRxResponse(
                (response) => {
                  snackService.showSuccess(translate.instant('account.msm.listedSuccess'));
                  store.dataTableSource().data = [...response];
                  patchState(store, { listLoading: false, accounts: response });
                },
                (error): void => {
                  snackService.showError(String(error.error.message));
                  patchState(store, { listLoading: false });
                },
              ),
            ),
          ),
        );
      });

      const createAccount = rxMethod<AccountCreateDto>(($) => {
        patchState(store, { listLoading: true });
        return $.pipe(
          switchMap((params) =>
            accountsRepository.create(params).pipe(
              handleRxResponse(
                (response) => {
                  console.log({ response });
                  const dialogRef = store.dialogRef();
                  if (dialogRef) {
                    const accountCreated: AccountsListModel = {
                      balance: String(response.balance),
                      account_location: response.account_location,
                      account_type: response.account_type,
                      bank: response.bank,
                      currency: response.currency,
                      id: response.id,
                      status: response.status,
                    };
                    const newList = store.dataTableSource().data.concat([accountCreated]);

                    store.dataTableSource().data = [...newList];
                    patchState(store, {
                      listLoading: false,
                      accounts: newList,
                    });
                    snackService.showSuccess(translate.instant('account.msm.createSuccess'));

                    dialogRef.close(true);
                  }
                },
                (error): void => {
                  snackService.showError(String(error.message ?? error));
                  patchState(store, { listLoading: false });
                },
              ),
            ),
          ),
        );
      });
      function setDialogRef(param: MatDialogRef<AccountFormContainer, boolean> | null): void {
        patchState(store, { dialogRef: param });
      }
      return {
        getAccounts,
        setDialogRef,
        createAccount,
      };
    },
  ),
);
