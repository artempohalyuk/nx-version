import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as playersActions from './index';
import { PlayersService } from "src/app/services";
import { IPlayer } from "@models";
import { map, switchMap } from "rxjs";

@Injectable()
export class PlayersEffects {
    constructor(
        private _actions$: Actions,
        private _playersService: PlayersService
    ) {}

    loadPlayers$ = createEffect(() => 
        this._actions$.pipe(
            ofType(playersActions.loadPlayers.type),
            switchMap(() => this._playersService.getActivePlayers()),
            map((players: IPlayer[]) => playersActions.loadPlayersSuccess({players}))
        )
    )
}