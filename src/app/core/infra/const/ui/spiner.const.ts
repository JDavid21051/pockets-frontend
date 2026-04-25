/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/25/2026
 * Module name:  spiner.const.ts
 * File name:    spiner.const.ts
 * IDE:          WebStorm
 */

import { AppStatusCoreEnum } from '@/domain/enums/app/app-status-core.enum';

export const SPINNER_CONST: Record<AppStatusCoreEnum, string> = {
  [AppStatusCoreEnum.basic]: 'text-neutral-700!',
  [AppStatusCoreEnum.primary]: 'text-primary-700!',
  [AppStatusCoreEnum.secondary]: 'text-secondary-700!',
  [AppStatusCoreEnum.tertiary]: 'text-tertiary-700!',
  [AppStatusCoreEnum.extra]: 'text-purple-700!',
  [AppStatusCoreEnum.error]: 'text-error-700!',
  [AppStatusCoreEnum.alert]: 'text-yellow-700!',
  [AppStatusCoreEnum.warning]: 'text-orange-700!',
  [AppStatusCoreEnum.success]: 'text-success-700!',
  [AppStatusCoreEnum.info]: 'text-info-700!',
};
