import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import type { AppStatusCoreEnum } from '@/domain/enums/app/app-status-core.enum';
import { UI_SNACK_ICON } from '@/infra/const/ui/snack.const';
import type { SnackBarParamsModel } from '@/domain/models/uix/snack-bar.model';

@Component({
  selector: 'krih-snack-bar',
  imports: [MatSnackBarModule, MatButton, MatIconModule],
  template: `
    <section class="krih_snack_bar_icon py-2 pr-2 pl-1.5 self-center rounded-md my-0 size-10">
      <mat-icon [svgIcon]="getIcon(snackData.status)" />
    </section>
    <section [class]="'flex flex-col justify-start gap-0.5 snack_text my-auto ' + snackCssClass">
      @if (snackData.title) {
        <h6 class="krih_snack_title text-base!">{{ snackData.title }}</h6>
      }
      <p class="krih_snack_msm" matSnackBarLabel>
        {{ snackData.message }}
      </p>
    </section>
    @if (false) {
      <span matSnackBarActions>
        <button mat-button matSnackBarAction (click)="onClickListener()">
          {{ snackData.actionText }}
        </button>
      </span>
    }
  `,
  styleUrl: './snack-bar.component.css',
  host: {
    '(click)': 'onClickListener()',
  },
})
export class SnackBarComponent {
  private readonly snackBarData = inject<SnackBarParamsModel>(MAT_SNACK_BAR_DATA);
  private readonly snackBarRef = inject<MatSnackBarRef<SnackBarComponent>>(MatSnackBarRef);

  get snackData(): SnackBarParamsModel {
    return this.snackBarData;
  }

  get snackCssClass(): string {
    return `snack_${this.snackBarData.status}`;
  }

  getIcon(status: AppStatusCoreEnum): string {
    return UI_SNACK_ICON[status];
  }

  onClickListener(): void {
    this.snackBarRef.dismissWithAction();
  }
}
