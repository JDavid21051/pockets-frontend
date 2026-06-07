import type { Routes } from '@angular/router';
import { validSessionGuard } from '@/infra/guards/valid-session.guard';

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
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-container'),
    loadChildren: () => import('@/infra/routes/admin.routes').then((r) => r.ADMIN_ROUTES),
    canActivate: [validSessionGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
