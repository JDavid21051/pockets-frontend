/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/24/2026
 * Module name:  api-error-map.const.ts
 * File name:    api-error-map.const
 * IDE:          WebStorm
 */

import { ApiErrorCodesEnum } from '@/domain/enums/app/api-error-codes.enum';
import {
  BadRequestException,
  ForbiddenException,
  InvalidCredentialsException,
  NotAuthenticatedException,
  SessionExpiredException,
  UnauthorizedException,
} from '@/infra/class/api-specific-exceptions.class';

/**
 * map of ApiErrorCodesEnum  and exceptions
 */
export const ApiErrorMap = new Map([
  [ApiErrorCodesEnum.BadRequest, BadRequestException],
  [ApiErrorCodesEnum.NotAuthenticated, NotAuthenticatedException],
  [ApiErrorCodesEnum.SessionExpired, SessionExpiredException],
  [ApiErrorCodesEnum.InvalidCredentials, InvalidCredentialsException],
  [ApiErrorCodesEnum.Unauthorized, UnauthorizedException],
  [ApiErrorCodesEnum.Forbidden, ForbiddenException],
]);
