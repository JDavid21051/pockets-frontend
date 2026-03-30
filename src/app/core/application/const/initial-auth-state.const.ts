/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/29/2026
 * Module name:  initial-auth-state.const.ts
 * File name:    initial-auth-state.const
 * IDE:          WebStorm
 */

import { UserRoleEnum } from '@/domain/enums/app/user-role.enum';
import type { UnauthenticatedUserModel } from '@/domain/models/auth/auth.model';

export const INITIAL_AUTH_STATE: UnauthenticatedUserModel = {
  isAuthenticated: false,
  refreshing: false,
  userRole: UserRoleEnum.Guest,
  userId: null,
  accessToken: '',
  accessTokenEndDate: '',
  refreshToken: '',
  refreshTokenEndDate: '',
};
