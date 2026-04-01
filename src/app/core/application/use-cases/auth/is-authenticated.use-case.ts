/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/1/2026
 * Module name:  is-authenticated.use-case.ts
 * File name:    is-authenticated.use-case
 * IDE:          WebStorm
 */

import { inject, Injectable } from '@angular/core';
import { AuthStoreService } from '@/infra/service/auth-store.service';
import type { BoolUseCasesPort } from '@/application/ports/app/standard-use-cases.port';

@Injectable({ providedIn: 'root' })
export class IsAuthenticatedUseCase implements BoolUseCasesPort {
  private readonly authStore: AuthStoreService = inject(AuthStoreService);

  execute(): boolean {
    return Boolean(this.authStore.isAuthenticated());
  }
}
