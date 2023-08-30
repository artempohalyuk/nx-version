import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as authActions from '@store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private _store: Store) {}

  canActivate(): Observable<Observable<boolean> | Promise<boolean>> {
    this._store.dispatch(authActions.loadUser());

    return this._store.pipe(
      select(authActions.selectAuthState),
      filter(s => !s.isLoading),
      take(1),
      map(state => {
          if (!state.user) {
            return this.router.navigate(['/auth'], { skipLocationChange: true })
          }
          return of(true);
      })
    );
  }
}
