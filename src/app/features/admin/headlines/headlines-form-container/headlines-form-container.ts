import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { HeadlinesFormFactory } from '@/infra/functions/headlines-form.factory';
import { MatSelectModule } from '@angular/material/select';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'krih-headlines-form-container',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './headlines-form-container.html',
  styleUrl: './headlines-form-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex! flex-col h-full',
  },
})
export class HeadlinesFormContainer {
  readonly dialogRef = inject(MatDialogRef<HeadlinesFormContainer>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);
  readonly headlineForm = HeadlinesFormFactory();

  onClickClose(): void {
    this.dialogRef.close();
  }
}
