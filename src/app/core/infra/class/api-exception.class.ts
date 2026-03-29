/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/24/2026
 * Module name:  api-exception.class.ts
 * File name:    api-exception.class
 * IDE:          WebStorm
 */

import type { ApiErrorBase, ApiResponseFailure } from '@/domain/models/app/api-core.models';
import { ApiErrorMap } from '@/infra/const/api-error-map.const';
import { InternalServerException } from '@/infra/class/api-specific-exceptions.class';
import type { ApiErrorCodesEnum } from '@/domain/enums/app/api-error-codes.enum';

export class ApiExceptionCore {
  static createError<T extends ApiErrorBase = ApiErrorBase>(response: ApiResponseFailure<T>) {
    const [error] = response.errors;
    const ExceptionClass = ApiErrorMap.get(error.code as ApiErrorCodesEnum);
    const CustomError = ExceptionClass ?? InternalServerException;
    return new CustomError(error.message);
  }
}
