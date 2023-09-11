import { CanActivateFn, Router } from '@angular/router';

import { filter, map, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as authActions from '@store/auth';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  store.dispatch(authActions.loadUser());

  return store.pipe(
    select(authActions.selectAuthState),
    filter(s => !s.isLoading),
    take(1),
    map(state => {
        if (!state.user) {
          router.navigate(['/auth'], { replaceUrl: true });
          return false;
        }
        return true;
    })
  );
}
