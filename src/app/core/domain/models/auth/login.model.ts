/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/24/2026
 * Module name:  login.model.ts
 * File name:    login.model
 * IDE:          WebStorm
 */

export interface LoginDto {
  readonly password: string;
}

export interface LoginResponse {
  readonly updatedAt: string;
  readonly userId: string;
  readonly accessToken: string;
  readonly accessTokenExp: number;
  readonly refreshToken: string;
  readonly refreshTokenExp: number;
}

export interface LoginStateModel {
  loading: boolean;
}

export interface LogoutDto {
  readonly accessToken: string;
}
