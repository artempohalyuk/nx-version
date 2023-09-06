import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as authActions from './index';
import { UserService } from "src/app/services";
import { IUser } from "@models";
import { map, switchMap } from "rxjs";
import { StorageHelper } from "src/app/utils";
import { StorageKey } from "src/app/shared";
import { Router } from "@angular/router";


const loadUser = createEffect(
    (_actions$ = inject(Actions), _userService = inject(UserService)) =>         
        _actions$.pipe(
            ofType(authActions.loadUser.type),
            switchMap(() => _userService.getCurrentUser()),
            map((user: IUser) => authActions.loadUserSuccess({user}))
    ),
    { functional: true }
  );


  const logout = createEffect(
    (_actions$ = inject(Actions), _router = inject(Router)) =>         
        _actions$.pipe(
            ofType(authActions.userLogout.type),
            map(() => {
                StorageHelper.setItem(localStorage, StorageKey.Token, null);
                _router.navigate(['/auth']);
            })
    ),
    { functional: true, dispatch: false }
  );

export const AuthEffects = {
    loadUser,
    logout
}
