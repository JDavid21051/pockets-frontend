import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { cn } from '@/infra/parsers/css-class-name';
import { FormFieldError } from '@/shared/ui/modules/form-field-error/form-field-error';
import type { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import type { GenericObjectModel } from '@/domain/types/app/generic-object.interface';
import type { MsmErrorsType } from '@/domain/types/app/msm-error-fn.type';
import type { StandardSizeType } from '@/domain/types/app/standard-size.type';
import type { StandardOrCustomStatus } from '@/domain/types/app/standard-status.type';
import type { MatSelectChange } from '@angular/material/select';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'krih-simple-select',
  imports: [
    MatFormField,
    MatLabel,
    TranslatePipe,
    FormFieldError,
    MatError,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatIcon,
    MatPrefix,
  ],
  templateUrl: './simple-select.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSelect {
  protected readonly cn = cn;
  readonly controlRef = input.required<FormControl>();
  readonly options = input.required<GenericObjectModel[]>();
  readonly keyName = input.required<keyof GenericObjectModel>();
  readonly keyValue = input.required<keyof GenericObjectModel>();
  // label
  readonly label = input('Label');
  readonly required = input(true);
  readonly labelClass = input('');
  readonly visibleLabel = input(true);
  // standard
  readonly idRef = input('');
  readonly size = input<StandardSizeType>('sm');
  readonly status = input<StandardOrCustomStatus>('basic');
  readonly placeholder = input('Ingrese su nombre');
  readonly selectClass = input<string>('');
  readonly prefixIcon = input<string>('');
  readonly fullWidthRef = input<boolean>(true);
  readonly separated = input<boolean>(true);
  // errors
  readonly errorTextClass = input<''>();
  readonly errorsMessage = input<MsmErrorsType | null>(null);
  readonly errorsGroupMessage = input<boolean>(false);
  readonly errorsVisible = input<boolean>(true);
  readonly openedChange = output<boolean>();
  readonly selectionChange = output<MatSelectChange>();
}
