import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
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
import { DOCUMENT_TYPE_LIST } from '@/infra/const/headlines/headlines-map.const';
import { TextField } from '@/shared/ui/modules/text-field/text-field';
import { SimpleSelect } from '@/shared/ui/modules/simple-select/simple-select';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'krih-headlines-form-container',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    MatDialogTitle,
    TextField,
    SimpleSelect,
  ],
  templateUrl: './headlines-form-container.html',
  styleUrl: './headlines-form-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex! flex-col h-full',
  },
})
export class HeadlinesFormContainer {
  protected readonly DOCUMENT_TYPE_LIST = DOCUMENT_TYPE_LIST;
  readonly dialogRef = inject(MatDialogRef<HeadlinesFormContainer>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);
  readonly headlineForm = HeadlinesFormFactory();

  onClickClose(): void {
    this.dialogRef.close();
  }

  onSubmitForm(): void {
    if (!this.headlineForm.valid) {
      this.headlineForm.markAllAsTouched();
      return;
    }
    const { name, document, documentType } = this.headlineForm.getRawValue();
    console.log({ name, document, documentType });
  }
}
