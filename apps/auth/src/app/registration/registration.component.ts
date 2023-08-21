import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service';

@Component({
  selector: 'nx-registration',
  templateUrl: './registration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
})
export class RegistrationComponent {
  registrationForm: FormGroup = this._fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  errors!: {
    firstName: { message: string };
    lastName: { message: string };
    email: { message: string };
    password: { message: string };
  } | null;
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
        // move logic to service or store
        localStorage.setItem('token', response.token);
        this._router.navigate(['/']);
      },
      (errorResponse) => {
        this.errors = errorResponse?.error?.error?.payload?.errors;
        this.isLoading = false;
        this._cdr.markForCheck();
      }
    );
  }
}
