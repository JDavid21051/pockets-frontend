/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/24/2026
 * Module name:  api-error-codes.enum.ts
 * File name:    api-error-codes.enum
 * IDE:          WebStorm
 */

import { HttpStatusCode } from '@angular/common/http';

export enum ApiErrorCodesEnum {
  BadRequest = HttpStatusCode.BadRequest,
  NotAuthenticated = HttpStatusCode.Unauthorized,
  SessionExpired = HttpStatusCode.Unauthorized,
  InvalidCredentials = HttpStatusCode.Unauthorized,
  Unauthorized = HttpStatusCode.Unauthorized,
  Forbidden = HttpStatusCode.Forbidden,
  MethodNotAllowed = HttpStatusCode.MethodNotAllowed,
  NotAcceptable = HttpStatusCode.NotAcceptable,
  Timeout = HttpStatusCode.RequestTimeout,
  Conflict = HttpStatusCode.Conflict,
  PreconditionFailed = HttpStatusCode.PreconditionFailed,
  FailedDependency = HttpStatusCode.FailedDependency,
  InternalServer = HttpStatusCode.InternalServerError,
  NotImplemented = HttpStatusCode.NotImplemented,
  BadGateway = HttpStatusCode.BadGateway,
  GatewayTimeout = HttpStatusCode.GatewayTimeout,
}
