import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/container/login-container'),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
