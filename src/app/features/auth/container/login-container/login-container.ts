import { Component, computed, inject, signal } from '@angular/core';
import { LoginStore } from '@/application/store/login.store';
import type { LoginStoreModel } from '@/application/store/login.store';
import type { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { SpinnerDirective } from '@/infra/directives/spinner.directive';

interface LoginFormControls {
  token: FormControl<string>;
}

@Component({
  selector: 'krih-login-container',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButton,
    SpinnerDirective,
    MatIconButton,
  ],
  templateUrl: './login-container.html',
})
export class LoginContainer {
  private readonly builder = inject(NonNullableFormBuilder);
  private readonly loginStore: LoginStoreModel = inject(LoginStore);
  readonly showPassword = signal(false);
  readonly form: FormGroup<LoginFormControls> = this.builder.group<LoginFormControls>({
    token: this.builder.control('', [Validators.required, Validators.minLength(8)]),
  });

  readonly fieldType = computed(() => (this.showPassword() ? 'text' : 'password'));
  readonly fieldIcon = computed(() => (this.showPassword() ? 'visibility' : 'visibility_off'));

  readonly isLoading = this.loginStore.loading;

  onToggleInputType(): void {
    this.showPassword.set(!this.showPassword());
  }

  onSubmitForm(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const { token } = this.form.getRawValue();
    this.loginStore.login({ password: token });
  }
}
