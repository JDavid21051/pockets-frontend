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
  readonly field: string;
  readonly header: string;
  readonly type: SkyColumnType;
  readonly grow?: number;
  readonly sortable?: boolean;
  readonly clearSort?: boolean;
  readonly startSort?: SortDirection;
  readonly iconPosition?: VerbSimplePosition;
}

export interface TableActionsConfigs {
  type: SkyTableActionsType;
}

export interface TableActionsConfig {
  type: SkyTableActionsType;
  label: string;
  icon: string;
}
export type TableActionsFullConfig = Record<SkyTableActionsType, TableActionsConfig>;
