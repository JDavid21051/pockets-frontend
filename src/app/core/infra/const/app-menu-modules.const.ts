/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/2/2026
 * Module name:  app-menu-modules.const.ts
 * File name:    app-menu-modules.const
 * IDE:          WebStorm
 */

import type { MenuItemModel } from '@/domain/models/uix/menu-item.model';

export const APP_MENU_MODULES: MenuItemModel[] = [
  {
    id: '0',
    label: 'shared.text.dashboard',
    tooltip: 'shared.text.dashboard',
    iconStart: 'dashboard',
    routerLink: '/admin/dashboard',
  },
  {
    id: '1',
    label: 'shared.text.headlines',
    tooltip: 'shared.text.headlines',
    iconStart: 'person',
    routerLink: '/admin/headlines',
  },
  {
    id: '2',
    label: 'shared.text.accounts',
    tooltip: 'shared.text.accounts',
    iconStart: 'account_balance',
    routerLink: '/admin/accounts',
  },
];
