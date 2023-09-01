import { createReducer, on } from "@ngrx/store";

import * as playersActions from './index';
import { IPlayersState } from "./players-state.model";

export const initialPlayersState: IPlayersState = {
    players: [],
    isLoading: false
};

export const playersReducer = createReducer<IPlayersState>(
    initialPlayersState,
    on(playersActions.loadPlayers, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(playersActions.loadPlayersSuccess, (state, { players }) => {
        return {
            ...state,
            isLoading: false,
            players
        };
    }),
);