/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/25/2026
 * Module name:  snack-bar.model.ts
 * File name:    snack-bar.model
 * IDE:          WebStorm
 */

import type {
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import type { AppStatusCoreEnum } from '@/domain/enums/app/app-status-core.enum';

export interface SnackBarParamsModel {
  message: string;
  status: AppStatusCoreEnum;
  title?: string;
  actionText?: string;
  duration?: number;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
  config?: MatSnackBarConfig;
  cssClass?: string | string[];
}

export interface SnackBarDataModel {
  message: string;
  status: AppStatusCoreEnum;
  cssClass?: string;
  title?: string;
  action?: string;
}
