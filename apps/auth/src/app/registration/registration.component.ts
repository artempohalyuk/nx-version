import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service';

@Component({
  selector: 'nx-registration',
  templateUrl: './registration.component.html',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule]
})
export class RegistrationComponent{
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  errors!: any;
  isLoading!: boolean;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  onSignUp(): void {
    this.isLoading = true;

    this._authService.registration({ 
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this._router.navigate(['/']);
      }, (errorResponse) => {
        this.errors = errorResponse && errorResponse.error && errorResponse.error.error.payload.errors;
        this.isLoading = false;
      }
    )
  }
}
