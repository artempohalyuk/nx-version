import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService, AuthHelperService } from '../service';
import { FormControlValidationDirective } from '../shared/directives';

@Component({
  selector: 'nx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule, FormControlValidationDirective]
})
export class LoginComponent {
  loginForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  errors!: { email: string, password: string } | null;
  isLoading!: boolean;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private _authService: AuthService,
    private _authHelperService: AuthHelperService,
    private _router: Router,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef
  ) {}

  onSignIn(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    
    this._authService.login(this.loginForm.value).subscribe(
      (response) => {
        this._authHelperService.saveToken(response.token);
        this._router.navigate(['/manager']);
      }, (errorResponse) => {
        this.errors = errorResponse && errorResponse.error && errorResponse.error.error.payload;
        this.isLoading = false;
        this._cdr.markForCheck();
      }
    )
  }
}
