/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         7/5/2026
 * Module name:  account-form.factory.ts
 * File name:    account-form.factory
 * IDE:          WebStorm
 */

import type { AccountsFormControls } from '@/domain/models/accounts/accounts.model';
import { inject } from '@angular/core';
import { type FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

export const AccountFormFactory = (): FormGroup<AccountsFormControls> => {
  const build = inject(NonNullableFormBuilder);

  return build.group<AccountsFormControls>({
    accountNumber: build.control('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(16),
    ]),
    type: build.control(null, [Validators.required]),
    currency: build.control(null, [Validators.required]),
    headline: build.control(null, [Validators.required]),
    balance: build.control('0', [Validators.required, Validators.minLength(1)]),
    bankLocation: build.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    bankName: build.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200),
    ]),
    enabled: build.control(true, [Validators.required]),
    tae: build.control('', [Validators.required, Validators.max(100)]),
    openAt: build.control('2026-06-29', [Validators.required]),
  });
};
