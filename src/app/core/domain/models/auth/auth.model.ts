/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/29/2026
 * Module name:  auth.model.ts
 * File name:    auth.model
 * IDE:          WebStorm
 */

import type { UserRoleEnum } from '@/domain/enums/app/user-role.enum';

export interface AuthAccessModel {
  accessToken: string;
  accessTokenEndDate: string;
  refreshToken: string;
  refreshTokenEndDate: string;
  userId: string | null;
  userRole: UserRoleEnum;
}

export interface AuthenticatedUserModel extends AuthAccessModel {
  isAuthenticated: true;
  refreshing: boolean;
  accessToken: string;
  accessTokenEndDate: string;
  refreshToken: string;
  refreshTokenEndDate: string;
  userId: string;
  userRole: UserRoleEnum;
}

export interface UnauthenticatedUserModel extends AuthAccessModel {
  isAuthenticated: false;
  refreshing: false;
  userId: null;
  userRole: UserRoleEnum.Guest;
}

export type AuthStateModel = AuthenticatedUserModel | UnauthenticatedUserModel;
