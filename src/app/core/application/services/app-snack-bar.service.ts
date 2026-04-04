import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import type { SnackBarParamsModel } from '@/domain/models/ui/snack-bar.model';
import { AppStatusCoreEnum } from '@/domain/enums/app/app-status-core.enum';
import { SnackBarComponent } from '@/shared/ui/atoms/snack-bar/snack-bar.component';
import { UI_SNACK_CSS_CLASS } from '@/infra/const/ui/snack.const';

const MILLISECONDS = 2000000;

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  readonly snackBarService = inject(MatSnackBar);

  get snackDuration(): number {
    return MILLISECONDS;
  }

  showSnack(params: SnackBarParamsModel): void {
    console.log('pasando por showSnack en service', params);
    this.snackBarService.openFromComponent<SnackBarComponent, SnackBarParamsModel>(
      SnackBarComponent,
      {
        ...params.config,
        duration: params.duration || this.snackDuration,
        data: {
          message: params.message,
          title: params.title,
          status: params.status,
          actionText: params.actionText,
          cssClass: params.config?.panelClass,
        },
      },
    );
  }

  showSnackByStatus(
    title: string,
    param: Partial<SnackBarParamsModel>,
    status: AppStatusCoreEnum,
  ): void {
    console.log('pasando por showSuccess en service');
    this.showSnack({
      message: param.message || '',
      status,
      title: title || param.title,
      actionText: param.actionText ?? 'Cancel',
      config: {
        ...param.config,
        panelClass: UI_SNACK_CSS_CLASS[status],
        horizontalPosition: param.horizontalPosition ?? 'right',
        verticalPosition: param.verticalPosition ?? 'top',
      },
    });
  }

  showSuccess(message: string, param: Partial<SnackBarParamsModel> = {}): void {
    this.showSnackByStatus(message, param, AppStatusCoreEnum.success);
  }

  showError(message: string, param: Partial<SnackBarParamsModel> = {}): void {
    this.showSnackByStatus(message, param, AppStatusCoreEnum.error);
  }

  showWarning(message: string, param: Partial<SnackBarParamsModel> = {}): void {
    this.showSnackByStatus(message, param, AppStatusCoreEnum.warning);
  }

  showInfo(message: string, param: Partial<SnackBarParamsModel> = {}): void {
    this.showSnackByStatus(message, param, AppStatusCoreEnum.info);
  }

  showBasic(message: string, param: Partial<SnackBarParamsModel> = {}): void {
    this.showSnackByStatus(message, param, AppStatusCoreEnum.basic);
  }

  showExtra(message: string, param: Partial<SnackBarParamsModel> = {}): void {
    this.showSnackByStatus(message, param, AppStatusCoreEnum.extra);
  }

  showPrimary(message: string, param: Partial<SnackBarParamsModel> = {}): void {
    this.showSnackByStatus(message, param, AppStatusCoreEnum.primary);
  }

  showSecondary(message: string, param: Partial<SnackBarParamsModel> = {}): void {
    this.showSnackByStatus(message, param, AppStatusCoreEnum.secondary);
  }

  showTernary(message: string, param: Partial<SnackBarParamsModel> = {}): void {
    this.showSnackByStatus(message, param, AppStatusCoreEnum.ternary);
  }
}
