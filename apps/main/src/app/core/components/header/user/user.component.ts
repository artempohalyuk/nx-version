import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class UserComponent {
  user$ = this._authService.getCurrentUser$();
  showDropdown!: boolean;

  constructor(private _authService: AuthService) { }

  logOut(): void {
    this._authService.logout();
  }
}
