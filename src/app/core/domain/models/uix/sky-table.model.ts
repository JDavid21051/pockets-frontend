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
import type { TooltipPosition } from '@angular/material/tooltip';

export interface SkyColumnsBaseConfig {
  readonly field: string;
  readonly header: string;
  readonly type: SkyColumnType;
  readonly grow?: number;
  readonly cssClass?: string;
  readonly sortable?: boolean;
  readonly clearSort?: boolean;
  readonly startSort?: SortDirection;
  readonly iconPosition?: VerbSimplePosition;
}

export interface SkyTextColumnsConfig extends SkyColumnsBaseConfig {
  readonly type: 'text';
  readonly prefix?: string;
  readonly suffix?: string;
}

export interface SkyPillColumnsConfig extends SkyColumnsBaseConfig {
  readonly type: 'pill';
}

export interface SkyActivePillColumnsConfig extends SkyColumnsBaseConfig {
  readonly type: 'activePill';
}

export interface SkyIconColumnsConfig extends SkyColumnsBaseConfig {
  readonly type: 'icon';
  readonly icon: string;
  readonly iconClass: string;
  readonly tooltip: string;
  readonly tooltipPosition: TooltipPosition;
}

export interface SkyMapBaseColumnConfig<
  TypeCol extends SkyColumnType,
  TKey extends string | number | symbol,
> extends SkyColumnsBaseConfig {
  readonly type: TypeCol;
  readonly mapValues: Record<TKey, string>;
}

export type SkyMapNumberColumnsConfig = SkyMapBaseColumnConfig<'mapNumber', number>;

export type SkyColumnsConfig =
  | SkyTextColumnsConfig
  | SkyMapNumberColumnsConfig
  | SkyPillColumnsConfig
  | SkyActivePillColumnsConfig
  | SkyIconColumnsConfig;

export interface TableActionsConfig {
  type: SkyTableActionsType;
  label: string;
  icon: string;
}

export type TableRowActionsResponse<T> = TableActionsConfig & {
  data: T;
};

export type TableActionsFullConfig = Record<SkyTableActionsType, TableActionsConfig>;
