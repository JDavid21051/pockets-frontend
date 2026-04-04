/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/2/2026
 * Module name:  app-menu-modules.const.ts
 * File name:    app-menu-modules.const
 * IDE:          WebStorm
 */

import type { MenuItemModel } from '@/domain/models/ui/menu-item.model';

export const APP_MENU_MODULES: MenuItemModel[] = [
  {
    id: crypto.randomUUID(),
    label: 'Dashboard',
    iconStart: 'dashboard',
    routerLink: '/home',
  },
  {
    id: crypto.randomUUID(),
    label: 'Titulares',
    iconStart: 'person',
    routerLink: '/headlines',
  },
];
