import { createFeature, createReducer, on } from "@ngrx/store";

import { IUserTeamState } from "./user-team-state.model";
import { UserTeamApiActions, UserTeamActions } from "./user-team.actions";

export const initialUserTeamState: IUserTeamState = {
    userTeam: null,
    isLoading: false,
    error: undefined
};

const userTeamReducer = createReducer<IUserTeamState>(
    initialUserTeamState,
    on(UserTeamApiActions.userTeamLoad, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(UserTeamApiActions.userTeamLoadSuccess, (state, { userTeam }) => {
        return {
            ...state,
            isLoading: false,
            userTeam
        };
    }),
    on(UserTeamApiActions.userTeamCreate, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(UserTeamApiActions.userTeamCreateSuccess, (state, { userTeam }) => {
        return {
            ...state,
            isLoading: false,
            userTeam
        };
    }),
    on(UserTeamApiActions.userTeamCreateFailure, (state, { error }) => {
        return {
            ...state,
            isLoading: false,
            error: error
        };
    }),
    // where is init action? 
    on(UserTeamApiActions.userTeamUpdateSuccess, (state, { userTeam }) => {
        return {
            ...state,
            isLoading: false,
            userTeam
        };
    }),
    // what is the difference between userTeamRemove and userTeamRemoveSuccess? 
    on(UserTeamApiActions.userTeamRemove, (state) => {
        return {
            ...state,
            // where we set it to false?             
            isLoading: true,
        };
    }),
    on(UserTeamApiActions.userTeamRemoveSuccess, (state) => {
        return {
            ...state,
            // where we actually remove the team? 
            isLoading: false,
        };
    }),
    on(UserTeamActions.userTeamAddPlayer, (state, { player }) => {
        let { userTeam } = state;
        
        if (userTeam) {
            userTeam = {...userTeam, players: [player, ...userTeam.players]}
        }

        return {
            ...state,
            // where we set it to false?             
            isLoading: true,
            userTeam
        };
    }),
    on(UserTeamActions.userTeamRemovePlayer, (state, { player }) => {
        let { userTeam } = state;
        
        if (userTeam) {
            const updatedPlayers = userTeam.players.filter(p => p.id !== player.id)

            userTeam = {...userTeam, players: updatedPlayers}
        }

        return {
            ...state,
            isLoading: true,
            userTeam
        };
    }),
);

export const userTeamFeature = createFeature({
    name: 'userTeam',
    reducer: userTeamReducer
})