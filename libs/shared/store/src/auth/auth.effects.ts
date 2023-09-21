import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, of, switchMap } from "rxjs";
import { Router } from "@angular/router";

import { UserService } from "@nx/shared/services";
import { IUser, StorageKey } from "@nx/shared/types";
import { StorageHelper } from "@nx/shared/utils";
import { AuthActions, AuthApiActions } from "./auth.actions";

const loadUser = createEffect((
    actions$ = inject(Actions),
    userService = inject(UserService)
) => 
    actions$.pipe(
        ofType(AuthApiActions.userLoad),
        switchMap(() => userService.getCurrentUser().pipe(
            map((user: IUser) => AuthApiActions.userLoadSuccess({user})),
            catchError((error) => of(AuthApiActions.userLoadFailure(error)))
        )),
    ),
    { functional: true }
)

const logout = createEffect((
    actions$ = inject(Actions),
    router = inject(Router)
) => 
    actions$.pipe(
        ofType(AuthActions.userLogout),
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