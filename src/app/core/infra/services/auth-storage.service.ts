/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/29/2026
 * Module name:  auth-storage.service.ts
 * File name:    auth-storage.service
 * IDE:          WebStorm
 */

import { inject, Injectable } from '@angular/core';
import { AUTH_STORAGE_KEY } from '@/infra/itoken/auth-storage-key.itoken';
import { LOCAL_STORAGE } from '@/infra/itoken/local-storage.itoken';
import type { AuthStateModel } from '@/domain/models/auth/auth.model';
import EncodeHandlerClass from '@/infra/class/encode-handler.class';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private readonly key = inject(AUTH_STORAGE_KEY);
  private readonly storage = inject(LOCAL_STORAGE);

  set(state: AuthStateModel): void {
    const valueEncode = EncodeHandlerClass.encode(state);
    if (valueEncode === null) return;
    this.storage.setItem(this.key, valueEncode);
  }

  get(): AuthStateModel | null {
    const item = this.storage.getItem(this.key);
    if (item === null) return null;
    return EncodeHandlerClass.decode(item);
  }

  remove(): void {
    this.storage.removeItem(this.key);
  }
}
