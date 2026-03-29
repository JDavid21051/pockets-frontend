/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/23/2026
 * Module name:  api-core.models.ts
 * File name:    api-core.models
 * IDE:          WebStorm
 */

import type { HttpStatusCode } from '@angular/common/http';

export interface ApiErrorBase {
  readonly code: number;
  readonly message: string;
}

export interface ApiResponseBase<T, E extends ApiErrorBase = ApiErrorBase> {
  code: string;
  success: boolean;
  message: string;
  result?: T;
  errors?: [E];
}

export interface ApiResponseSuccessfully<T> extends ApiResponseBase<T> {
  success: true;
  result: T;
  errors?: never;
}

export interface ApiResponseFailure<E extends ApiErrorBase = ApiErrorBase> extends ApiResponseBase<
  never,
  E
> {
  success: false;
  result?: never;
  errors: [E];
}

export type ApiResponse<T, E extends ApiErrorBase = ApiErrorBase> =
  | ApiResponseSuccessfully<T>
  | ApiResponseFailure<E>;

/**
 * interface defining the http response of the system
 */
export interface ApiResponseModel<T> {
  status: HttpStatusCode;
  errorMessage?: string;
  errorCode?: string;
  body?: T | null;
}
