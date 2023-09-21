import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { map, switchMap } from "rxjs";

import { PlayersService } from "../../services";
import { IPlayer } from "@models";
import { PlayersApiActions } from "./players.actions";

const loadPlayers = createEffect((
    actions$ = inject(Actions),
    playersService = inject(PlayersService)
) => 
    actions$.pipe(
        ofType(PlayersApiActions.playersLoad.type),
        switchMap(() => playersService.getActivePlayers().pipe(
            map((players: IPlayer[]) => PlayersApiActions.playersLoadSuccess({players}))
        )),
    ), { functional: true }
)

export const PlayersEffects = {
    loadPlayers
}