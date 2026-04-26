import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
  MatPrefix,
  MatSuffix,
} from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { FormFieldError } from '@/shared/ui/modules/form-field-error/form-field-error';
import type { MsmErrorsType } from '@/domain/types/app/msm-error-fn.type';
import { cn } from '@/infra/parsers/css-class-name';

@Component({
  selector: 'krih-text-field',
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    ReactiveFormsModule,
    TranslatePipe,
    MatSuffix,
    FormFieldError,
  ],
  templateUrl: './text-field.html',
  styleUrl: './text-field.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block containerClassHost()',
  },
})
export class TextField {
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
  //  readonly size = input<NbComponentSize>('small');
  // input
  readonly idRef = input('');
  // readonly status = input<NbComponentOrCustomStatus>('basic');
  readonly placeholder = input('Ingrese su nombre');
  readonly type = input<string>('text');
  readonly min = input<number>();
  readonly max = input<number>();
  readonly prefixIcon = input<string>('');
  readonly suffixIcon = input<string>('');
  readonly errorTextClass = input<''>();
  readonly errorsMessage = input<MsmErrorsType | null>(null);
  readonly errorsGroupMessage = input<boolean>(false);
  readonly errorsVisible = input<boolean>(true);
  readonly containerClassHost = computed(
    () => `${this.containerClass()} ${this.separated() ? 'mb-2' : ''}`,
  );

  /**
   * @description
   * Method that returns the control is required.
   */
  controlRequired(): boolean {
    return this.controlRef().hasValidator(Validators.required);
  }
}
