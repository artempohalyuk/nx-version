import { CanActivateFn, Router } from '@angular/router';

import { filter, map, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';


import { inject } from '@angular/core';
import { AuthApiActions, authFeature } from '@store/auth';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  store.dispatch(AuthApiActions.userLoad());

  return store.pipe(
    select(authFeature.selectAuthState),
    filter(s => !s.isLoading),
    take(1),
    map(state => {
        if (!state.user) {
          router.navigate(['/auth']);
          return false;
        }
        return true;
    })
  );
}
