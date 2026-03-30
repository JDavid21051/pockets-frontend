import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { LoginStore } from '../../login/login.store';
import type { LoginStoreModel } from '../../login/login.store';
import type { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { AuthStoreService } from '@/infra/service/auth-store.service';

interface LoginFormControls {
  token: FormControl<string>;
}

@Component({
  selector: 'krih-login-container',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButton],
  templateUrl: './login-container.html',
  styleUrl: './login-container.css',
})
export class LoginContainer implements OnInit {
  private readonly builder = inject(NonNullableFormBuilder);
  private readonly loginStore: LoginStoreModel = inject(LoginStore);
  private readonly authStore: AuthStoreService = inject(AuthStoreService);
  readonly form: FormGroup<LoginFormControls> = this.builder.group<LoginFormControls>({
    token: this.builder.control('', [Validators.required, Validators.minLength(8)]),
  });

  ngOnInit(): void {
    console.log('aaaa this.store.doLogin()');
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
