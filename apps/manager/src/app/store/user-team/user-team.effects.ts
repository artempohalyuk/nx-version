import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as userTeamActions from './index';
import { UserTeamService } from "src/app/services";
import { IHttpErrorResponse, IUserTeam } from "@models";
import { catchError, map, of, switchMap } from "rxjs";

const loadUserTeam = createEffect((
    actions$ = inject(Actions),
    userTeamService = inject(UserTeamService)
) => 
    actions$.pipe(
        ofType(userTeamActions.loadUserTeam.type),
        switchMap(() => userTeamService.getUserTeam()),
        map((userTeam: IUserTeam) => userTeamActions.loadUserTeamSuccess({userTeam}))
        // What will happen if call fails?
    ), { functional: true }
)

const createUserTeam = createEffect((
    actions$ = inject(Actions),
    userTeamService = inject(UserTeamService)
) => 
    actions$.pipe(
        ofType(userTeamActions.createUserTeam.type),
        switchMap(({name}) => userTeamService.createUserTeam(name)),
        // it is better to move "map" and "catchError" inside switchMap
        // here is an example https://ngrx.io/guide/effects/lifecycle#resubscribe-on-error
        // problem with the current code it that it will work until first error and everything else will be ignored
        // https://www.learnrxjs.io/learn-rxjs/operators/error_handling/catch
        map((userTeam: IUserTeam) => userTeamActions.createUserTeamSuccess({userTeam})),
        catchError((error: IHttpErrorResponse) => of(
            userTeamActions.createUserTeamFailure({ error: error.error.error?.statusMessage })
        ))
    ), { functional: true }
)

const addPlayerToUserTeam = createEffect((
    actions$ = inject(Actions),
    userTeamService = inject(UserTeamService)
) => 
    actions$.pipe(
        ofType(userTeamActions.addPlayerToUserTeam.type),
        switchMap(({userTeam}) => userTeamService.updateUserTeam(userTeam)),
        map((userTeam: IUserTeam) => userTeamActions.updateUserTeamSuccess({userTeam}))
       // What will happen if call fails?
    ), { functional: true }
)

const removePlayerFromUserTeam = createEffect((
    actions$ = inject(Actions),
    userTeamService = inject(UserTeamService)
) => 
    actions$.pipe(
        ofType(userTeamActions.removePlayerFromUserTeam.type),
        switchMap(({userTeam}) => userTeamService.updateUserTeam(userTeam)),
        map((userTeam: IUserTeam) => userTeamActions.updateUserTeamSuccess({userTeam}))
    ), { functional: true }
)

const removeUserTeam = createEffect((
    actions$ = inject(Actions),
    userTeamService = inject(UserTeamService)
) => 
    actions$.pipe(
        ofType(userTeamActions.removeUserTeam.type),
        switchMap(() => userTeamService.removeUserTeam()),
        map((status: boolean) => userTeamActions.removeUserTeamSuccess({status}))
    ), { functional: true }
)

export const UserTeamEffects = {
    loadUserTeam,
    createUserTeam,
    addPlayerToUserTeam,
    removePlayerFromUserTeam,
    removeUserTeam
}