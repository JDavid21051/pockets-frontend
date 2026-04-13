/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/12/2026
 * Module name:  headlines-form.factory.ts
 * File name:    headlines-form.factory
 * IDE:          WebStorm
 */

import { inject } from '@angular/core';
import type { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NonNullableFormBuilder } from '@angular/forms';
import type { SummaryListModel } from '@/domain/models/app/summary-list.model';

export interface HeadlinesFormControls {
  name: FormControl<string>;
  document: FormControl<string>;
  documentType: FormControl<SummaryListModel<number> | null>;
}

export const HeadlinesFormFactory = (): FormGroup<HeadlinesFormControls> => {
  const build = inject(NonNullableFormBuilder);

  return build.group<HeadlinesFormControls>({
    name: build.control('', [Validators.required, Validators.minLength(3)]),
    documentType: build.control(null, [Validators.required]),
    document: build.control('', [Validators.required, Validators.minLength(6)]),
  });
};
