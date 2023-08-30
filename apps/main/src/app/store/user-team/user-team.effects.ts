import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as userTeamActions from './index';
import { UserTeamService } from "src/app/services";
import { IHttpErrorResponse, IUserTeam } from "@models";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class UserTeamEffects {
    constructor(
        private _actions$: Actions,
        private _userTeamService: UserTeamService
    ) {}

    loadUserTeam$ = createEffect(() => 
        this._actions$.pipe(
            ofType(userTeamActions.loadUserTeam.type),
            switchMap(() => this._userTeamService.getUserTeam()),
            map((userTeam: IUserTeam) => userTeamActions.loadUserTeamSuccess({userTeam}))
        )
    )

    createUserTeam$ = createEffect(() => 
        this._actions$.pipe(
            ofType(userTeamActions.createUserTeam.type),
            switchMap(({name}) => this._userTeamService.createUserTeam(name)),
            map((userTeam: IUserTeam) => userTeamActions.createUserTeamSuccess({userTeam})),
            catchError((error: IHttpErrorResponse) => of(
                userTeamActions.createUserTeamFailure({ error: error.error.error?.statusMessage })
            )),
        )
    )

    addPlayerToUserTeam$ = createEffect(() => 
        this._actions$.pipe(
            ofType(userTeamActions.addPlayerToUserTeam.type),
            switchMap(({userTeam}) => this._userTeamService.updateUserTeam(userTeam)),
            map((userTeam: IUserTeam) => userTeamActions.updateUserTeamSuccess({userTeam}))
        )
    )

    removePlayerFromUserTeam$ = createEffect(() => 
        this._actions$.pipe(
            ofType(userTeamActions.removePlayerFromUserTeam.type),
            switchMap(({userTeam}) => this._userTeamService.updateUserTeam(userTeam)),
            map((userTeam: IUserTeam) => userTeamActions.updateUserTeamSuccess({userTeam}))
        )
    )

    removeUserTeam$ = createEffect(() => 
        this._actions$.pipe(
            ofType(userTeamActions.removeUserTeam.type),
            switchMap(() => this._userTeamService.removeUserTeam()),
            map((status: boolean) => userTeamActions.removeUserTeamSuccess({status}))
        )
    )
}