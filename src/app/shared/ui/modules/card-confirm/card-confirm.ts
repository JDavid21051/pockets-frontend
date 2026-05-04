import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import type { HeadlinesFormContainer } from '@/features/admin/headlines/headlines-form-container/headlines-form-container';

@Component({
  selector: 'krih-card-confirm',
  imports: [MatDialogContent, MatButton, MatDialogActions],
  templateUrl: './card-confirm.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex! flex-col h-full',
  },
})
export class CardConfirm {
  private readonly dialogRef = inject<MatDialogRef<HeadlinesFormContainer, boolean>>(
    MatDialogRef<HeadlinesFormContainer, boolean>,
  );

  onClickClose(returnValue = false): void {
    this.dialogRef.close(returnValue);
  }
}
