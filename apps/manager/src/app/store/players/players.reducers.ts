import { createFeature, createReducer, on } from "@ngrx/store";

import { IPlayersState } from "./players-state.model";
import { PlayersActions, PlayersApiActions } from "./players.actions";

export const initialPlayersState: IPlayersState = {
    players: [],
    filteredPlayers: [],
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
            players,
            filteredPlayers: [...players]
        };
    }),
    on(PlayersActions.playersFilterByName, (state, { search }) => {
        const { players } = state;

        if (!search) {
            return {
                ...state,
                filteredPlayers: [...players]
            };
        }

        const searchLower = search.toLowerCase()
        const filteredPlayers = players.filter(player => {
            const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();
    
            return fullName.includes(searchLower);
        });
      
        return {
            ...state,
            isLoading: false,
            filteredPlayers
        };
    }),
    on(PlayersActions.playersFilterByPosition, (state, { position }) => {
        const { players } = state;

        if (!position) {
            return {
                ...state,
                filteredPlayers: [...players]
            };
        }
      
        const filteredPlayers = players.filter(player => player.position === position);

        return {
            ...state,
            isLoading: false,
            filteredPlayers
        };
    }),
);

export const playersFeature = createFeature({
    name: 'players',
    reducer: playersReducer
})