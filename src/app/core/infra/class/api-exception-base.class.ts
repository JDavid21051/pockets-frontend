/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/24/2026
 * Module name:  api-exception-base.class.ts
 * File name:    api-exception-base.class
 * IDE:          WebStorm
 */

import type { ApiErrorCodesEnum } from '@/domain/enums/app/api-error-codes.enum';

export abstract class ApiExceptionBase extends Error {
  abstract readonly code: ApiErrorCodesEnum;
  constructor(message: string, cause?: Error) {
    super(message, { cause });
  }
}
