/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/23/2026
 * Module name:  api-core.models.ts
 * File name:    api-core.models
 * IDE:          WebStorm
 */

import type { HttpContext, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';

export interface ApiErrorBase {
  readonly code: number;
  readonly message: string;
}

export interface ApiResponseBase<TResult, TError extends ApiErrorBase = ApiErrorBase> {
  success: boolean;
  message: string;
  data: TResult;
  error?: TError;
}

export interface ApiSuccessResponse<TResult> extends ApiResponseBase<TResult> {
  success: true;
  data: TResult;
}

export interface ApiFailedResponse<
  TError extends ApiErrorBase = ApiErrorBase,
> extends ApiResponseBase<never, TError> {
  success: false;
  data: never;
  error: TError;
}

export type ApiResponse<TSuccess, TError extends ApiErrorBase = ApiErrorBase> =
  | ApiSuccessResponse<TSuccess>
  | ApiFailedResponse<TError>;

export interface ApiResponseModel<T> {
  status: HttpStatusCode;
  errorMessage?: string;
  errorCode?: string;
  body?: T | null;
}

export interface ApiRequestOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  context?: HttpContext;
  timeout?: number;
  params?:
    | HttpParams
    | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
}
