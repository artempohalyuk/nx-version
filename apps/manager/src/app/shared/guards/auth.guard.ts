import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as authActions from '@store/auth';

export const canActivateAuthGuard = () => {
  const router = inject(Router);
  const _store = inject(Store)
  _store.dispatch(authActions.loadUser());

  return _store.pipe(
    select(authActions.selectAuthState),
    filter(s => !s.isLoading),
    take(1),
    map(state => {
        if (!state.user) {
          return router.navigate(['/auth'], { skipLocationChange: true })
        }
        return of(true);
    })
  );
}
