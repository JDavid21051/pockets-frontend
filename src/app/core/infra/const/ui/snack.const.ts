/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/29/2026
 * Module name:  snack.const.ts
 * File name:    snack.const
 * IDE:          WebStorm
 */

import { AppStatusCoreEnum } from '@/domain/enums/app/app-status-core.enum';

export const UI_SNACK_ICON: Record<AppStatusCoreEnum, string> = {
  [AppStatusCoreEnum.success]: 'check',
  [AppStatusCoreEnum.alert]: 'error',
  [AppStatusCoreEnum.warning]: 'warning',
  [AppStatusCoreEnum.error]: 'close',
  [AppStatusCoreEnum.info]: 'bell',
  [AppStatusCoreEnum.basic]: 'bell',
  [AppStatusCoreEnum.extra]: 'bell',
  [AppStatusCoreEnum.primary]: 'bell',
  [AppStatusCoreEnum.secondary]: 'bell',
  [AppStatusCoreEnum.ternary]: 'bell',
};

export const UI_SNACK_CSS_CLASS: Record<AppStatusCoreEnum, string> = {
  [AppStatusCoreEnum.success]: 'snack_success',
  [AppStatusCoreEnum.alert]: 'snack_alert',
  [AppStatusCoreEnum.warning]: 'snack_warning',
  [AppStatusCoreEnum.error]: 'snack_error',
  [AppStatusCoreEnum.info]: 'snack_info',
  [AppStatusCoreEnum.basic]: 'snack_basic',
  [AppStatusCoreEnum.extra]: 'snack_extra',
  [AppStatusCoreEnum.primary]: 'snack_primary',
  [AppStatusCoreEnum.secondary]: 'snack_secondary',
  [AppStatusCoreEnum.ternary]: 'snack_ternary',
};
