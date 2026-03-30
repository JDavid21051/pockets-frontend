/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/29/2026
 * Module name:  auth-store.service.ts
 * File name:    auth-store.service
 * IDE:          WebStorm
 */

import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import { INITIAL_AUTH_STATE } from '@/application/const/initial-auth-state.const';
import { UserRoleEnum } from '@/domain/enums/app/user-role.enum';
import type { AuthStateModel } from '@/domain/models/auth/auth.model';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStorageService } from '@/infra/service/auth-storage.service';
import type { LoginResponse } from '@/domain/models/auth/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private readonly authState$ = new BehaviorSubject<AuthStateModel>(INITIAL_AUTH_STATE);
  private readonly level$ = new BehaviorSubject<UserRoleEnum>(UserRoleEnum.Guest);
  private readonly authorizeUser$ = new Subject<LoginResponse>();
  private readonly router: Router = inject(Router);
  private readonly storeService: AuthStorageService = inject(AuthStorageService);
  readonly isAuthenticated = toSignal(this.authState$.pipe(map((state) => state.isAuthenticated)));
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
            accessTokenEndDate: '',
            refreshTokenEndDate: '',
          };
          this.storeService.set(newState);
          this.authState$.next(newState);
        }),
      )
      .subscribe();
  }

  private initListener(): void {
    this.listenAuthorizeUser();
  }

  private initStoreData(): void {
    const state = this.storeService.get();
    if (state) return this.authState$.next(state);
    this.authState$.next(INITIAL_AUTH_STATE);
  }

  authorizeUser(userData: LoginResponse): void {
    this.authorizeUser$.next(userData);
  }
}
