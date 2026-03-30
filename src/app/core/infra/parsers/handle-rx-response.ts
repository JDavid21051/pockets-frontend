/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/24/2026
 * Module name:  handle-rx-response.ts
 * File name:    handle-rx-response
 * IDE:          WebStorm
 */

import { catchError, EMPTY, of, pipe, tap } from 'rxjs';
import type { UnaryFunction, Observable } from 'rxjs';
import type { ApiFailedResponse } from '@/domain/models/app/api-core.models';

export function handleResponse<TResponse, TError = Error>(
  onSuccess: (response: TResponse) => void,
  onError?: (error: TError) => void,
  onFinally?: () => void,
): UnaryFunction<Observable<TResponse>, Observable<TResponse>> {
  return pipe(
    tap({ next: onSuccess, complete: onFinally }),
    catchError((error: TError) => {
      onError?.(error);
      onFinally?.();
      return EMPTY;
    }),
  );
}

export function handleRxResponse<TResponse, TError = ApiFailedResponse>(
  onSuccess: (response: TResponse) => void,
  onError?: (error: TError) => void,
  onFinally?: () => void,
): UnaryFunction<Observable<TResponse>, Observable<TResponse>> {
  return handleResponse(
    onSuccess,
    (error: TError) => {
      onError?.(error);
      onFinally?.();
      return of(null);
    },
    onFinally,
  );
}
