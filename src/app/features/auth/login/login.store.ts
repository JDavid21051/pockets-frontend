/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/22/2026
 * Module name:  login.store.ts
 * File name:    login.store
 * IDE:          WebStorm
 */
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { LoginRepository } from '@/infra/repository/login.repository';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import type { LoginDto } from '@/domain/models/auth/login.model';
import { handleRxResponse } from '@/infra/parsers/handle-rx-response';
import { SnackBarService } from '@/application/services/app-snack-bar.service';
import { AuthStoreService } from '@/infra/service/auth-store.service';

interface LoginStateModel {
  loading: boolean;
}

const initLoginState: LoginStateModel = {
  loading: true,
};

export const LoginStore = signalStore(
  { providedIn: 'root' },
  withState(initLoginState),
  withMethods(
    (
      store,
      snackService = inject(SnackBarService),
      loginRepo = inject(LoginRepository),
      authStore = inject(AuthStoreService),
    ) => {
      const login = rxMethod<LoginDto>(($) =>
        $.pipe(
          switchMap((params) =>
            loginRepo.login(params).pipe(
              handleRxResponse(
                (response) => {
                  console.log({ response });
                  snackService.showSuccess('Has iniciado sesión con exito');
                  authStore.authorizeUser(response);
                },
                (error): void => {
                  console.log(error.error);
                  snackService.showError(String(error.error.message));
                },
              ),
            ),
          ),
        ),
      );

      return {
        login,
      };
    },
  ),
);
export type LoginStoreModel = InstanceType<typeof LoginStore>;
