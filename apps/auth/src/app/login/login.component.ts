import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service';

@Component({
  selector: 'nx-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule]
})
export class LoginComponent {
  email!: string;
  password!: string;
  errors!: { email: string, password: string };
  isLoading!: boolean;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  onSignIn(): void {
    this.isLoading = true;

    this._authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this._router.navigate(['/']);
      }, (errorResponse) => {
        this.errors = errorResponse && errorResponse.error && errorResponse.error.error.payload;
        this.isLoading = false;
      }
    )
  }
}
