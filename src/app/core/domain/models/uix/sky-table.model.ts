/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/4/2026
 * Module name:  sky-table.model.ts
 * File name:    sky-table.model
 * IDE:          WebStorm
 */

import type { SkyColumnType, SkyTableActionsType } from '@/domain/types/uix/table.type';
import type { SortDirection } from '@/domain/types/app/sort-direction.type';
import type { VerbSimplePosition } from '@/domain/types/app/position.type';

export interface SkyColumnsConfig {
  field: string;
  header: string;
  type: SkyColumnType;
  sortable?: boolean;
  clearSort?: boolean;
  startSort?: SortDirection;
  iconPosition?: VerbSimplePosition;
}

export interface TableActionsConfig {
  type: SkyTableActionsType;
}
