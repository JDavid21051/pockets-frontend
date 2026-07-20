import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { MatDateFormats} from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import type { MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import type { MsmErrorsType } from '@/domain/types/app/msm-error-fn.type';
import { type FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { cn } from '@/infra/parsers/css-class-name';
import { TranslatePipe } from '@ngx-translate/core';
import { FormFieldError } from '@/shared/ui/modules/form-field-error/form-field-error';

export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'MM/dd/YYYY',
  },
  display: {
    dateInput: 'MM/dd/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'krih-datepicker-field',
  providers: [provideNativeDateAdapter(MY_FORMATS)],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIcon,
    TranslatePipe,
    ReactiveFormsModule,
    FormFieldError,
  ],
  templateUrl: './datepicker-field.html',
  styleUrl: './datepicker-field.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerField {
  protected readonly cn = cn;
  readonly controlRef = input.required<FormControl>();
  readonly containerClass = input<string>('');
  readonly separated = input<boolean>(true);
  // label
  readonly label = input('');
  readonly required = input(true);
  readonly readonly = input(false);
  readonly labelClass = input('');
  readonly visibleLabel = input(true);
  // input
  readonly idRef = input('');
  readonly placeholder = input('Ingrese su nombre');
  readonly prefixIcon = input<string>('');
  readonly suffixIcon = input<string>('today');
  readonly errorTextClass = input<''>();
  readonly errorsMessage = input<MsmErrorsType | null>(null);
  readonly errorsGroupMessage = input<boolean>(false);
  readonly errorsVisible = input<boolean>(true);
  readonly disabled = input(false);

  readonly changeInput = output<MatDatepickerInputEvent<Date>>();
  readonly changeDate = output<MatDatepickerInputEvent<Date>>();

  /**
   * @description
   * Method that returns the control is required.
   */
  controlRequired(): boolean {
    return this.controlRef().hasValidator(Validators.required);
  }
}
