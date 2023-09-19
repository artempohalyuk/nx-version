import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUser } from '@models';
import { AuthActions, authFeature } from '@store/auth';


@Component({
  selector: 'nx-user',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class UserComponent {
  user$: Observable<IUser | null> = this._store.select(authFeature.selectUser);

  constructor(
    private _store: Store
  ) { }

  logOut(): void {
    this._store.dispatch(AuthActions.userLogout({
      user: null
    }));
  }
}
