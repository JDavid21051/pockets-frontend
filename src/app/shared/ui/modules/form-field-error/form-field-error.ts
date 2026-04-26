import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import type { MsmErrorsType } from '@/domain/types/app/msm-error-fn.type';
import type { AbstractControl, ValidationErrors } from '@angular/forms';
import { BasicMessagesError, errorsWithParams } from '@/infra/const/basic-messages-error.const';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'krih-form-field-error',
  imports: [TranslatePipe],
  template: `
    @if (errorsVisible()) {
      @if (needsParams) {
        {{ errorMessage() | translate: { valueToShow: getErrorParam() } }}
      } @else {
        {{ errorMessage() | translate }}
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormFieldError {
  readonly errorsVisible = input<boolean>(true);
  readonly groupErrors = input<boolean>(false);
  readonly controlRef = input.required<AbstractControl>();
  readonly errors = input<MsmErrorsType | null>(null);

  get needsParams(): boolean {
    return errorsWithParams.includes(this.getErrorKey());
  }

  private getErrorKey(): string {
    const errors: ValidationErrors = this.getControlErrors();
    const errorKey = Object.keys(errors)[0];
    if (!errorKey) return '';
    return errorKey;
  }

  private getControlErrors(): ValidationErrors {
    if (!this.groupErrors()) return this.controlRef().errors ?? {};
    const controlErrors: ValidationErrors = this.controlRef().errors ?? {};
    const parentErrors: ValidationErrors = this.controlRef().parent?.errors ?? {};
    return { ...controlErrors, parentErrors };
  }

  getErrorParam(): string {
    if (this.getErrorKey() === 'minlength') {
      return this.getControlErrors()['minlength']['requiredLength'];
    } else if (this.getErrorKey() === 'maxlength') {
      return this.getControlErrors()['maxlength']['requiredLength'];
    }
    return '';
  }

  errorMessage(): string {
    const errorKey = this.getErrorKey();
    if (!errorKey) return '';
    const errorMessages = this.errors();
    const messagesToShow = errorMessages
      ? { ...BasicMessagesError, ...errorMessages }
      : BasicMessagesError;
    const msmValue = messagesToShow[errorKey];
    if (typeof msmValue === 'string') {
      return msmValue;
    }

    return msmValue();
  }
}
