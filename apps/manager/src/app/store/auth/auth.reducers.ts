import { createReducer, on } from "@ngrx/store";

import * as authActions from './index';
import { IAuthState } from "./auth-state.model";

export const initialAuthState: IAuthState = {
    user: null,
    isLoading: false,
};

export const authReducer = createReducer<IAuthState>(
    initialAuthState,
    on(authActions.loadUser, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(authActions.loadUserSuccess, (state, { user }) => {
        return {
            ...state,
            isLoading: false,
            user: user
        };
    }),
    on(authActions.loadUserFailure, (state) => {
        return {
            ...state,
            isLoading: false,
            user: null
        };
    }),
    on(authActions.userLogout, (state, { user }) => {
        return {
            ...state,
            isLoading: true,
            user: user
        };
    }),
);