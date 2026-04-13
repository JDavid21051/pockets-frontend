/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/5/2026
 * Module name:  headlines.store.ts
 * File name:    headlines.store
 * IDE:          WebStorm
 */

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { SnackBarService } from '@/infra/service/app-snack-bar.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { HeadlinesRepository } from '@/infra/repository/modules/headlines.repository';
import { handleRxResponse } from '@/infra/parsers/handle-rx-response';
import { TranslateService } from '@ngx-translate/core';
import { initHeadlinesState } from '@/infra/const/headlines/initial-headlines-state.const';

export const HeadlinesStore = signalStore(
  { providedIn: 'root' },
  withState(initHeadlinesState),
  withMethods(
    (
      store,
      snackService = inject(SnackBarService),
      translate = inject(TranslateService),
      headlinesRepository = inject(HeadlinesRepository),
    ) => {
      const getHeadlines = rxMethod<void>(() => {
        patchState(store, { listLoading: true });
        return headlinesRepository.list().pipe(
          handleRxResponse(
            (response) => {
              snackService.showSuccess(translate.instant('headline.msm.listedSuccess'));
              console.log({ response });
              store.dataTableSource().data = [...response];
              patchState(store, { listLoading: false, dataList: response });
            },
            (error): void => {
              snackService.showError(String(error.error.message));
              patchState(store, { listLoading: false });
            },
          ),
        );
      });
      return {
        getHeadlines,
      };
    },
  ),
);
