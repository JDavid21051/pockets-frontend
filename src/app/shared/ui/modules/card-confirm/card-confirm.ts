import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import type { ConfirmDialogDataModel } from '@/domain/models/uix/confirm.model';

@Component({
  selector: 'krih-card-confirm',
  imports: [MatDialogContent, MatButton, MatDialogActions, TranslatePipe],
  template: `
    <mat-dialog-content class="flex! flex-col space-y-3 flex-1">
      <h4>{{ titleText() | translate }}</h4>
      <span [innerHTML]="dialogData.msm | translate"> </span>
      @if (dialogData.description) {
        <span [innerHTML]="dialogData.description"> </span>
      }
    </mat-dialog-content>
    <mat-dialog-actions class="mt-auto! mb-0!">
      <button
        mat-button
        class="variant-semi-round"
        color="secondary"
        type="button"
        (click)="onClickClose()"
      >
        {{ cancelText() | translate }}
      </button>
      <button
        matButton="outlined"
        class="variant-semi-round border-error-700!"
        color="error"
        type="button"
        (click)="onClickClose(true)"
      >
        {{ confirmText() | translate }}
      </button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex! flex-col h-full',
  },
})
export class CardConfirm {
  private readonly dialogRef = inject<MatDialogRef<CardConfirm, boolean>>(
    MatDialogRef<CardConfirm, boolean>,
  );

  protected readonly dialogData = inject<ConfirmDialogDataModel>(MAT_DIALOG_DATA);
  protected readonly cancelText = () => this.dialogData.cancelText || 'shared.text.confirmNo';
  protected readonly confirmText = () => this.dialogData.confirmText || 'shared.text.confirmYes';
  protected readonly titleText = () => this.dialogData.title || 'shared.text.confirmTitle';

  onClickClose(returnValue = false): void {
    this.dialogRef.close(returnValue);
  }
}
