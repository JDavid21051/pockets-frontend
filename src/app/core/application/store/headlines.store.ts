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
import type { CreateHeadlinesDto } from '@/domain/models/headlines/headlines.model';
import { switchMap } from 'rxjs';
import type { MatDialogRef } from '@angular/material/dialog';
import type { HeadlinesFormContainer } from '@/features/admin/headlines/headlines-form-container/headlines-form-container';

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
      function setDialogRef(param: MatDialogRef<HeadlinesFormContainer, boolean> | null): void {
        patchState(store, { dialogRef: param });
      }
      const getHeadlines = rxMethod<void>(() => {
        patchState(store, { listLoading: true });
        return headlinesRepository.list().pipe(
          handleRxResponse(
            (response) => {
              console.log({ response });
              snackService.showSuccess(translate.instant('headline.msm.listedSuccess'));
              store.dataTableSource().data = [...response];
              patchState(store, { listLoading: false, dialogRef: null, dataList: response });
            },
            (error): void => {
              snackService.showError(String(error.error.message));
              patchState(store, { listLoading: false });
            },
          ),
        );
      });

      const createHeadline = rxMethod<CreateHeadlinesDto>(($) =>
        $.pipe(
          switchMap((params) => {
            patchState(store, { listLoading: true });
            return headlinesRepository.create(params).pipe(
              handleRxResponse(
                (createResponse) => {
                  console.log({ createResponse });

                  const dialogRef = store.dialogRef();
                  if (dialogRef) {
                    const newList = store.dataTableSource().data.concat([createResponse]);

                    store.dataTableSource().data = [...newList];
                    patchState(store, {
                      listLoading: false,
                      dataList: newList,
                    });
                    snackService.showSuccess(translate.instant('headline.msm.createSuccess'));

                    dialogRef.close(true);
                  }
                },
                (error) => {
                  snackService.showError(String(error.error.message));
                  patchState(store, { listLoading: false });
                },
              ),
            );
          }),
        ),
      );

      return {
        getHeadlines,
        createHeadline,
        setDialogRef,
      };
    },
  ),
);
