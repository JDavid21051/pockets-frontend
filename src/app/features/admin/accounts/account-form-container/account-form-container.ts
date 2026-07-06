import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  type OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import type {
  AccountsFormControls,
  AccountsListModel,
} from '@/domain/models/accounts/accounts.model';
import { AccountFormFactory } from '@/infra/functions/account-form.factory';
import type { FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountsStore } from '@/application/store/accounts.store';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { TextField } from '@/shared/ui/modules/text-field/text-field';
import { SimpleSelect } from '@/shared/ui/modules/simple-select/simple-select';
import { ACCOUNT_TYPE_LIST } from '@/infra/const/account/accounts-map.const';

export interface AccountFormDialogData {
  readonly editing: boolean;
  readonly data: AccountsListModel;
}

@Component({
  selector: 'krih-account-form-container',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    MatIconButton,
    TranslatePipe,
    FormsModule,
    TextField,
    ReactiveFormsModule,
    SimpleSelect,
    MatButton,
    MatDialogActions,
  ],
  templateUrl: './account-form-container.html',
  styleUrl: './account-form-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex! flex-col h-full',
  },
})
export class AccountFormContainer implements OnInit {
  private readonly store = inject(AccountsStore);
  private readonly dialogRef = inject<MatDialogRef<AccountFormContainer, boolean>>(
    MatDialogRef<AccountFormContainer, boolean>,
  );

  readonly accountForm: FormGroup<AccountsFormControls> = AccountFormFactory();
  readonly dialogData = inject<AccountFormDialogData>(MAT_DIALOG_DATA);
  readonly data = model(this.dialogData.data);
  readonly editing = model(this.dialogData.editing);
  readonly formTitle = computed(() =>
    this.editing() ? 'account.title.edit' : 'account.title.create',
  );

  readonly accountTypeList = ACCOUNT_TYPE_LIST;

  private setAccountDefaultFormValues(): void {
    if (!this.editing()) return;

    this.accountForm.patchValue({
      balance: Number(this.data().balance),
    });
  }

  ngOnInit(): void {
    this.store.setDialogRef(this.dialogRef);
    this.setAccountDefaultFormValues();
  }

  onSubmitForm(): void {
    console.log('onSubmitForm');
  }

  onClickClose(): void {
    this.dialogRef.close(false);
  }
}
