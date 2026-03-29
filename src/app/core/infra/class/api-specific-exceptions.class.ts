/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/24/2026
 * Module name:  api-exception.class.ts
 * File name:    api-exception.class
 * IDE:          WebStorm
 */

import { ApiExceptionBase } from '@/infra/class/api-exception-base.class';
import { ApiErrorCodesEnum } from '@/domain/enums/app/api-error-codes.enum';

export class BadRequestException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.BadRequest;
}
export class NotAuthenticatedException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.NotAuthenticated;
}
export class SessionExpiredException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.SessionExpired;
}
export class InvalidCredentialsException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.InvalidCredentials;
}
export class UnauthorizedException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.Unauthorized;
}
export class ForbiddenException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.Forbidden;
}
export class MethodNotAllowed extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.MethodNotAllowed;
}
export class NotAcceptableException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.NotAcceptable;
}
export class TimeoutException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.Timeout;
}
export class ConflictException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.Conflict;
}
export class PreconditionFailed extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.PreconditionFailed;
}
export class FailedDependencyException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.FailedDependency;
}
export class InternalServerException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.InternalServer;
}
export class NotImplementedException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.NotImplemented;
}
export class BadGatewayException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.BadGateway;
}
export class GatewayTimeoutException extends ApiExceptionBase {
  override code = ApiErrorCodesEnum.GatewayTimeout;
}
