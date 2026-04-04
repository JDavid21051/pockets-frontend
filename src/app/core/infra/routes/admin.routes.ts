/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/3/2026
 * Module name:  admin.routes.ts
 * File name:    admin.routes
 * IDE:          WebStorm
 */

import type { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
  {
    path: 'dashboard',
    loadComponent: () => import('@/features/admin/dashboard/dashboard-container'),
  },
  {
    path: 'headlines',
    loadComponent: () => import('@/features/admin/headlines/headlines-container'),
  },
  {
    path: 'accounts',
    loadComponent: () => import('@/features/admin/accounts/account-container'),
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'prefix' },
];
