/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/5/2026
 * Module name:  auth.interceptor.ts
 * File name:    auth.interceptor
 * IDE:          WebStorm
 */

import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IsAccessTokenExpiredUseCase } from '@/application/use-cases/auth/is-access-token-expired.use-case';
import { IsRefreshTokenExpiredUseCase } from '@/application/use-cases/auth/is-refresh-token-expired.use-case';
import { AuthStoreService } from '@/infra/service/auth-store.service';
import { catchError, EMPTY, filter, first, switchMap } from 'rxjs';
import { AUTH_REQUEST_CONTEXT } from '@/infra/http/context-tokens/auth-request.context-token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const interceptRequest = req.context.get(AUTH_REQUEST_CONTEXT);
  if (!interceptRequest) return next(req);

  const accessTokenUC = inject(IsAccessTokenExpiredUseCase);
  const refreshTokenUC = inject(IsRefreshTokenExpiredUseCase);
  const authStore = inject(AuthStoreService);

  if (!authStore.isAuthenticated()) {
    return next(req);
  }

  if (refreshTokenUC.execute() || accessTokenUC.execute()) {
    authStore.unauthorizeUser();
    return EMPTY;
  }
  const accessToken = authStore.accessToken();
  const refreshToken = authStore.refreshToken();
  if (accessToken && refreshToken) {
    return authStore.refreshing$.pipe(
      filter((refreshing) => !refreshing),
      first(),
      switchMap(() => {
        const reqCloned = req.clone({ setHeaders: { Authorization: accessToken } });

        return next(reqCloned).pipe(
          catchError((err) => {
            console.log({ catchErrorRefreshing: err });
            return EMPTY;
          }),
        );
      }),
    );
  }

  return next(req);
};
