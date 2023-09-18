import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthHelperService, AuthService } from '../service';
import { FormControlValidationDirective } from '../shared/directives';

@Component({
  selector: 'nx-registration',
  templateUrl: './registration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule, FormControlValidationDirective]
})
export class RegistrationComponent{
  registrationForm: FormGroup = this._fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  // why ot to use default value here or allow undefined? 
  errors!: {
    firstName: { message: string },
    lastName: { message: string },
    email: { message: string },
    password: { message: string }
  } | null;
  // why ot to use default value here?
  isLoading!: boolean;

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  constructor(
    private _authService: AuthService,
    private _authHelperService: AuthHelperService,
    private _router: Router,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef
  ) {}

  onSignUp(): void {
    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this._authService.registration(this.registrationForm.value).subscribe(
      (response) => {
        this._authHelperService.saveToken(response.token);
        this._router.navigate(['/manager']);
      }, (errorResponse) => {
        this.errors = errorResponse?.error?.error?.payload?.errors;
        this.isLoading = false;
        this._cdr.markForCheck();
      }
    )
  }
}
