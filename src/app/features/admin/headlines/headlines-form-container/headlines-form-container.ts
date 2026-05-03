import type { OnInit } from '@angular/core';
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
import { HeadlinesStore } from '@/application/store/headlines.store';
import type { HeadlinesModelList } from '@/domain/models/headlines/headlines.model';
import { NO_FIND_INDEX } from '@/infra/const/app-utils.const';

export interface HeadlinesFormDialogData {
  readonly data: HeadlinesModelList;
  readonly editing: boolean;
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
export class HeadlinesFormContainer implements OnInit {
  // injects
  private readonly store = inject(HeadlinesStore);
  private readonly dialogRef = inject<MatDialogRef<HeadlinesFormContainer, boolean>>(
    MatDialogRef<HeadlinesFormContainer, boolean>,
  );

  protected readonly DOCUMENT_TYPE_LIST = DOCUMENT_TYPE_LIST;
  readonly dialogData = inject<HeadlinesFormDialogData>(MAT_DIALOG_DATA);
  // inputs, outputs
  readonly data = model(this.dialogData.data);
  readonly editing = model(this.dialogData.editing);
  // states
  readonly headlineForm = HeadlinesFormFactory();

  private setDefaultFormValues(): void {
    if (!this.editing()) return;

    this.headlineForm.patchValue({
      name: this.data().headlines_name,
      document: this.data().headlines_document,
    });
    const documentTypeSelected = DOCUMENT_TYPE_LIST.findIndex(
      (value) => value.id === this.data().document_type,
    );
    if (documentTypeSelected > NO_FIND_INDEX) {
      this.headlineForm.patchValue({
        documentType: DOCUMENT_TYPE_LIST[documentTypeSelected],
      });
    }
  }

  ngOnInit(): void {
    this.store.setDialogRef(this.dialogRef);
    this.setDefaultFormValues();
  }

  onClickClose(): void {
    this.dialogRef.close(false);
  }

  onSubmitForm(): void {
    if (!this.headlineForm.valid) {
      this.headlineForm.markAllAsTouched();
      return;
    }
    const { name, document: documentNumber, documentType } = this.headlineForm.getRawValue();

    if (!documentType) {
      this.headlineForm.markAllAsTouched();
      return;
    }

    const document_type = Number(documentType.id);
    const headlines_document = Number(documentNumber);

    console.log({ name, document_type, documentType });

    if (isNaN(document_type) || isNaN(headlines_document)) {
      this.headlineForm.markAllAsTouched();
      return;
    }

    if (this.editing()) {
      this.store.updateHeadline({
        id: this.data().id,
        headlines_name: name,
        document_type,
        headlines_document: String(headlines_document),
      });

      return;
    }

    this.store.createHeadline({
      headlines_name: name,
      document_type,
      headlines_document: String(headlines_document),
    });
  }
}
