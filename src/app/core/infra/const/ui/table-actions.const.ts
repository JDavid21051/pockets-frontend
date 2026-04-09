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
    label: 'Eliminar',
  },
  update: {
    type: 'update',
    icon: 'edit',
    label: 'Actualizar',
  },
  detail: {
    type: 'detail',
    icon: 'edit',
    label: 'Actualizar',
  },
  updateStatus: {
    type: 'updateStatus',
    icon: 'cached',
    label: 'Cambiar de estado',
  },
};
