import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as authActions from './index';
import { UserService } from "src/app/services";
import { IUser } from "@models";
import { map, switchMap, tap } from "rxjs";
import { StorageHelper } from "src/app/utils";
import { StorageKey } from "src/app/shared";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    constructor(
        private _actions$: Actions,
        private _router: Router,
        private _userService: UserService
    ) {}

    loadUser$ = createEffect(() => 
        this._actions$.pipe(
            ofType(authActions.loadUser.type),
            switchMap(() => this._userService.getCurrentUser()),
            map((user: IUser) => authActions.loadUserSuccess({user}))
        )
    )

    logout$ = createEffect(() => 
        this._actions$.pipe(
            ofType(authActions.userLogout.type),
            map(() => {
                StorageHelper.setItem(localStorage, StorageKey.Token, null);
                this._router.navigate(['/auth']);
            })
        ), { dispatch: false }
    )
}