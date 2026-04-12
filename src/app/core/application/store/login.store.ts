/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/22/2026
 * Module name:  login.store.ts
 * File name:    login.store
 * IDE:          WebStorm
 */
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { AuthRepository } from '@/infra/repository/auth.repository';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import type { LoginDto, LoginStateModel } from '@/domain/models/auth/login.model';
import { handleRxResponse } from '@/infra/parsers/handle-rx-response';
import { SnackBarService } from '@/infra/service/app-snack-bar.service';
import { AuthStoreService } from '@/infra/service/auth-store.service';
import { Router } from '@angular/router';

const initLoginState: LoginStateModel = {
  loading: false,
};

export const LoginStore = signalStore(
  { providedIn: 'root' },
  withState(initLoginState),
  withMethods(
    (
      store,
      snackService = inject(SnackBarService),
      router = inject(Router),
      loginRepo = inject(AuthRepository),
      authStore = inject(AuthStoreService),
    ) => {
      const redirectTo = async (path = '/admin') => {
        await router.navigate([path]);
      };
      const login = rxMethod<LoginDto>(($) =>
        $.pipe(
          switchMap((params) => {
            patchState(store, { loading: true });
            return loginRepo.login(params).pipe(
              handleRxResponse(
                (response) => {
                  console.log({ response });
                  snackService.showSuccess('Has iniciado sesión con exito');
                  authStore.authorizeUser(response);
                  redirectTo().catch((error) => {
                    snackService.showError(String(error));
                  });
                  patchState(store, { loading: false });
                },
                (error): void => {
                  snackService.showError(String(error.error.message));
                  patchState(store, { loading: false });
                },
              ),
            );
          }),
        ),
      );

      return {
        login,
      };
    },
  ),
);
export type LoginStoreModel = InstanceType<typeof LoginStore>;
