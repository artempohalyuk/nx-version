import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";

import { UserTeamService } from "../../services";
import { IUserTeam } from "@models";
import { UserTeamApiActions, UserTeamActions } from "./user-team.actions";
import { userTeamFeature } from "./user-team.reducers";
import { IHttpErrorResponse } from '@nx/shared/types';

const loadUserTeam = createEffect((
    actions$ = inject(Actions),
    userTeamService = inject(UserTeamService)
) => 
    actions$.pipe(
        ofType(UserTeamApiActions.userTeamLoad.type),
        // it is good to test what will happen in case if second action is dispatched while request is processing
        switchMap(() => userTeamService.getUserTeam().pipe(
            map((userTeam: IUserTeam) => UserTeamApiActions.userTeamLoadSuccess({userTeam}))
        )),
        // it is good to test what will happen if first request fails and after that we have another action
    ), { functional: true }
)

const createUserTeam = createEffect((
    actions$ = inject(Actions),
    userTeamService = inject(UserTeamService)
) => 
    actions$.pipe(
        ofType(UserTeamApiActions.userTeamCreate.type),
        switchMap(({name}) => userTeamService.createUserTeam(name).pipe(
            map((userTeam: IUserTeam) => UserTeamApiActions.userTeamCreateSuccess({userTeam})),
            catchError((error: IHttpErrorResponse) => of(
                UserTeamApiActions.userTeamCreateFailure({ error: error.error.error?.statusMessage })
            ))
        )),
    ), { functional: true }
)

const addPlayerToUserTeam = createEffect((
    actions$ = inject(Actions),
    userTeamService = inject(UserTeamService),
    store = inject(Store)
) => 
    actions$.pipe(
        ofType(UserTeamActions.userTeamAddPlayer.type),
        withLatestFrom(store.select(userTeamFeature.selectUserTeam)),
        switchMap(([action, userTeam]) => userTeamService.updateUserTeam(userTeam!).pipe(
            map((userTeam: IUserTeam) => UserTeamApiActions.userTeamUpdateSuccess({userTeam}))
        )),
    ), { functional: true }
)

const removePlayerFromUserTeam = createEffect((
    actions$ = inject(Actions),
    userTeamService = inject(UserTeamService),
    store = inject(Store)
) => 
    actions$.pipe(
        ofType(UserTeamActions.userTeamRemovePlayer.type),
        withLatestFrom(store.select(userTeamFeature.selectUserTeam)),
        switchMap(([action, userTeam]) => userTeamService.updateUserTeam(userTeam!).pipe(
            map((userTeam: IUserTeam) => UserTeamApiActions.userTeamUpdateSuccess({userTeam}))
        )),
    ), { functional: true }
)

const removeUserTeam = createEffect((
    actions$ = inject(Actions),
    userTeamService = inject(UserTeamService)
) => 
    actions$.pipe(
        ofType(UserTeamApiActions.userTeamRemove.type),
        switchMap(() => userTeamService.removeUserTeam().pipe(
            map((status: boolean) => UserTeamApiActions.userTeamRemoveSuccess({status}))
        )),
    ), { functional: true }
)

export const UserTeamEffects = {
    loadUserTeam,
    createUserTeam,
    addPlayerToUserTeam,
    removePlayerFromUserTeam,
    removeUserTeam
}