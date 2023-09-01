import { createReducer, on } from "@ngrx/store";

import * as userTeamActions from './index';
import { IUserTeamState } from "./user-team-state.model";
import { IUserTeam } from "@models";

export const initialUserTeamState: IUserTeamState = {
    userTeam: null,
    isLoading: false,
    error: undefined
};

export const userTeamReducer = createReducer<IUserTeamState>(
    initialUserTeamState,
    on(userTeamActions.loadUserTeam, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(userTeamActions.loadUserTeamSuccess, (state, { userTeam }) => {
        return {
            ...state,
            isLoading: false,
            userTeam
        };
    }),
    on(userTeamActions.createUserTeam, (state) => {
        return {
            ...state,
            isLoading: false,
        };
    }),
    on(userTeamActions.createUserTeamSuccess, (state, { userTeam }) => {
        return {
            ...state,
            isLoading: false,
            userTeam
        };
    }),
    on(userTeamActions.createUserTeamFailure, (state, { error }) => {
        return {
            ...state,
            isLoading: false,
            error: error
        };
    }),
    on(userTeamActions.updateUserTeamSuccess, (state, { userTeam }) => {
        return {
            ...state,
            isLoading: false,
            userTeam
        };
    }),
    on(userTeamActions.removeUserTeam, (state) => {
        return {
            ...state,
            isLoading: false,
        };
    }),
    on(userTeamActions.removeUserTeamSuccess, (state) => {
        return {
            ...state,
            isLoading: false,
        };
    }),
    on(userTeamActions.addPlayerToUserTeam, (state, { userTeam }) => {
        return {
            ...state,
            isLoading: false,
            userTeam
        };
    }),
    on(userTeamActions.removePlayerFromUserTeam, (state, { userTeam }) => {
        return {
            ...state,
            isLoading: false,
            userTeam
        };
    }),
);