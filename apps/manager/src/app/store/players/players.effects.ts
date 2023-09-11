import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as playersActions from './index';
import { PlayersService } from "src/app/services";
import { IPlayer } from "@models";
import { map, switchMap } from "rxjs";

const loadPlayers = createEffect((
    actions$ = inject(Actions),
    playersService = inject(PlayersService)
) => 
    actions$.pipe(
        ofType(playersActions.loadPlayers.type),
        switchMap(() => playersService.getActivePlayers()),
        map((players: IPlayer[]) => playersActions.loadPlayersSuccess({players}))
    ), { functional: true }
)

export const PlayersEffects = {
    loadPlayers
}