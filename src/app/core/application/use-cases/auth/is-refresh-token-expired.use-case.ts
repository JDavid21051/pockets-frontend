/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/5/2026
 * Module name:  is-token-expired.use-case.ts
 * File name:    decode-token.use-case
 * IDE:          WebStorm
 */

import { inject, Injectable } from '@angular/core';
import type { BoolUseCasesPort } from '@/application/ports/app/standard-use-cases.port';
import { AuthStoreService } from '@/infra/service/auth-store.service';
import { isNullish } from '@/infra/const/is-nullish.const';

@Injectable({ providedIn: 'root' })
export class IsRefreshTokenExpiredUseCase implements BoolUseCasesPort {
  private readonly authStore: AuthStoreService = inject(AuthStoreService);

  execute(): boolean {
    try {
      const tokenExp = this.authStore.refreshTokenExpired();
      if (isNullish(tokenExp)) return true;

      const currentNumericDate = Math.floor(Date.now() / 1000);
      return tokenExp < currentNumericDate;
    } catch {
      return true;
    }
  }
}
