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

      return {
        getAccounts,
      };
    },
  ),
);
