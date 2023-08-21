import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AuthService } from 'src/app/services';

@Component({
  selector: 'nx-user',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class UserComponent {
  //move to store
  user$ = this._authService.getCurrentUser$();
  // not used
  showDropdown!: boolean;

  constructor(private _authService: AuthService) {}

  logOut(): void {
    this._authService.logout();
  }
}
