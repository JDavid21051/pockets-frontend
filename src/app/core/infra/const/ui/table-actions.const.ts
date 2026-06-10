/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/8/2026
 * Module name:  table-actions.const.ts
 * File name:    table-actions.const
 * IDE:          WebStorm
 */

import type { TableActionsFullConfig } from '@/domain/models/uix/sky-table.model';

export const TABLE_ACTIONS_FULL_CONFIG_MAP: TableActionsFullConfig = {
  delete: {
    type: 'delete',
    icon: 'delete',
    label: 'shared.text.delete',
  },
  update: {
    type: 'update',
    icon: 'edit',
    label: 'shared.text.update',
  },
  detail: {
    type: 'detail',
    icon: 'visibility',
    label: 'shared.text.viewDetail',
  },
  updateStatus: {
    type: 'updateStatus',
    icon: 'cached',
    label: 'shared.text.changeStatus',
  },
};
