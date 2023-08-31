import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUser } from '@models';
import * as authActions from '@store/auth';

@Component({
  selector: 'nx-user',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class UserComponent {
  user$: Observable<IUser | null> = this._store.select(authActions.selectUser);

  constructor(
    private _store: Store
  ) { }

  logOut(): void {
    this._store.dispatch(authActions.userLogout({
      user: null
    }));
  }
}
