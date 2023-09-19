import { createFeature, createReducer, on } from "@ngrx/store";

import { IPlayersState } from "./players-state.model";
import { PlayersApiActions } from "./players.actions";

export const initialPlayersState: IPlayersState = {
    players: [],
    isLoading: false
};

const playersReducer = createReducer<IPlayersState>(
    initialPlayersState,
    on(PlayersApiActions.playersLoad, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(PlayersApiActions.playersLoadSuccess, (state, { players }) => {
        return {
            ...state,
            isLoading: false,
            players
        };
    }),
);

export const playersFeature = createFeature({
    name: 'players',
    reducer: playersReducer
})