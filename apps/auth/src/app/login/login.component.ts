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
  selector: 'nx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
})
export class LoginComponent {
  loginForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  errors!: { email: string; password: string } | null;
  isLoading!: boolean;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private _authService: AuthService,
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
        // keeping logic inside component is not a best practice
        localStorage.setItem('token', response.token);
        this._router.navigate(['/']);
      },
      (errorResponse) => {
        this.errors =
          errorResponse &&
          errorResponse.error &&
          errorResponse.error.error.payload;
        this.isLoading = false;
        this._cdr.markForCheck();
      }
    );
  }
}
