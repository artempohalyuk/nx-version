import { IPlayer } from "@models";
import { createAction, props } from "@ngrx/store";

export const loadPlayers = createAction('[Players] Load');
export const loadPlayersSuccess = createAction(
    `${loadPlayers.type} Success`,
    props<{
        players: IPlayer[];
    }>()
);