/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/1/2026
 * Module name:  valid-session.guard.ts
 * File name:    user-sesion.guard
 * IDE:          WebStorm
 */

import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { IsAuthenticatedUseCase } from '@/application/use-cases/auth/is-authenticated.use-case';

export const validSessionGuard: CanActivateFn = () => {
  const isAuthenticated: IsAuthenticatedUseCase = inject(IsAuthenticatedUseCase);
  const router: Router = inject(Router);

  if (isAuthenticated.execute()) return true;

  return router.createUrlTree(['/login']);
};
