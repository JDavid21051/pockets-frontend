/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/5/2026
 * Module name:  headlines.store.ts
 * File name:    headlines.store
 * IDE:          WebStorm
 */

import type { HeadlinesStateModel } from '@/domain/models/headlines/headlines.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { SnackBarService } from '@/infra/service/app-snack-bar.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { HeadlinesRepository } from '@/infra/repository/modules/headlines.repository';
import { handleRxResponse } from '@/infra/parsers/handle-rx-response';

const initHeadlinesState: HeadlinesStateModel = {
  listLoading: false,
  dataList: [],
};

export const HeadlinesStore = signalStore(
  { providedIn: 'root' },
  withState(initHeadlinesState),
  withMethods(
    (
      store,
      snackService = inject(SnackBarService),
      headlinesRepository = inject(HeadlinesRepository),
    ) => {
      const getHeadlines = rxMethod<void>(() => {
        patchState(store, { listLoading: true });
        return headlinesRepository.list().pipe(
          handleRxResponse(
            (response) => {
              snackService.showSuccess('Titulares cargados con exito');
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
