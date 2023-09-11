import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as authActions from './index';
import { UserService } from "src/app/services";
import { IUser } from "@models";
import { catchError, map, of, switchMap } from "rxjs";
import { StorageHelper } from "src/app/utils";
import { StorageKey } from "src/app/shared";
import { Router } from "@angular/router";

const loadUser = createEffect((
    actions$ = inject(Actions),
    userService = inject(UserService)
) => 
    actions$.pipe(
        ofType(authActions.loadUser.type),
        switchMap(() => userService.getCurrentUser()),
        map((user: IUser) => authActions.loadUserSuccess({user})),
        catchError((error) => of(authActions.loadUserFailure(error)))
    ),
    { functional: true }
)

const logout = createEffect((
    actions$ = inject(Actions),
    router = inject(Router)
) => 
    actions$.pipe(
        ofType(authActions.userLogout.type),
        map(() => {
            StorageHelper.setItem(localStorage, StorageKey.Token, null);
            router.navigate(['/auth']);
        })
    ), { functional: true, dispatch: false }
)

export const AuthEffects = {
    loadUser,
    logout
}