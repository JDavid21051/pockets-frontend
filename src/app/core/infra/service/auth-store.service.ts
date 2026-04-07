/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/29/2026
 * Module name:  auth-store.service.ts
 * File name:    auth-store.service
 * IDE:          WebStorm
 */

import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, map, Subject, switchMap, tap } from 'rxjs';
import { INITIAL_AUTH_STATE } from '@/infra/const/auth/initial-auth-state.const';
import { UserRoleEnum } from '@/domain/enums/app/user-role.enum';
import type { AuthStateModel } from '@/domain/models/auth/auth.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStorageService } from '@/infra/service/auth-storage.service';
import type { LoginResponse } from '@/domain/models/auth/login.model';
import { AuthRepository } from '@/infra/repository/auth.repository';
import { handleResponse } from '@/infra/parsers/handle-rx-response';
import { Router } from '@angular/router';
import { SnackBarService } from '@/infra/service/app-snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private readonly authState$ = new BehaviorSubject<AuthStateModel>(INITIAL_AUTH_STATE);
  private readonly level$ = new BehaviorSubject<UserRoleEnum>(UserRoleEnum.Guest);
  private readonly authorizeUser$ = new Subject<LoginResponse>();
  private readonly unauthorizeUser$ = new Subject<void>();
  private readonly storeService: AuthStorageService = inject(AuthStorageService);
  private readonly authRepo: AuthRepository = inject(AuthRepository);
  private readonly router: Router = inject(Router);
  private readonly snackService: SnackBarService = inject(SnackBarService);

  readonly isAuthenticated = toSignal(this.authState$.pipe(map((state) => state.isAuthenticated)));

  readonly accessTokenExpired = toSignal(
    this.authState$.pipe(map((state) => state.accessTokenEndDate)),
  );

  readonly accessToken = toSignal(this.authState$.pipe(map((state) => state.accessToken)));

  readonly refreshTokenExpired = toSignal(
    this.authState$.pipe(map((state) => state.refreshTokenEndDate)),
  );

  readonly refreshToken = toSignal(this.authState$.pipe(map((state) => state.refreshToken)));

  readonly refreshing$ = this.authState$.pipe(
    map((state) => (state.isAuthenticated ? state.refreshing : false)),
  );

  readonly userLevel = toSignal<UserRoleEnum>(this.level$.pipe(map((value) => value)));

  constructor() {
    this.initStoreData();
    this.initListener();
  }

  private listenAuthorizeUser(): void {
    this.authorizeUser$
      .pipe(
        tap((payload: LoginResponse) => {
          const newState: AuthStateModel = {
            userId: payload.userId,
            accessToken: payload.accessToken,
            isAuthenticated: true,
            refreshing: false,
            refreshToken: payload.refreshToken,
            userRole: UserRoleEnum.SuperUser,
            accessTokenEndDate: payload.accessTokenExp,
            refreshTokenEndDate: payload.refreshTokenExp,
          };
          this.storeService.set(newState);
          this.authState$.next(newState);
        }),
      )
      .subscribe();
  }

  private listenUnauthorizeUser(): void {
    this.unauthorizeUser$
      .pipe(
        switchMap(() => {
          const state = this.authState$.value;
          if (!state.isAuthenticated) return EMPTY;
          return this.authRepo.logout({ accessToken: state.accessToken }).pipe(
            handleResponse(
              () => this.resetStore(),
              () => {
                this.resetStore();
                return EMPTY;
              },
            ),
          );
        }),
      )
      .subscribe();
  }

  private initListener(): void {
    this.listenAuthorizeUser();
    this.listenUnauthorizeUser();
  }

  private initStoreData(): void {
    const state = this.storeService.get();
    if (state) return this.authState$.next(state);
    this.authState$.next(INITIAL_AUTH_STATE);
  }

  private resetStore(): void {
    this.authState$.next(INITIAL_AUTH_STATE);
    this.storeService.remove();
    this.snackService.showError('Su sesión ha expirado. Por favor inicie sesión ');
    this.router.navigate(['/login']).catch((error) => {
      this.snackService.showError(String(error));
    });
  }

  authorizeUser(userData: LoginResponse): void {
    this.authorizeUser$.next(userData);
  }

  unauthorizeUser(): void {
    this.unauthorizeUser$.next();
  }
}
