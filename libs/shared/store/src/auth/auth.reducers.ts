import { createFeature, createReducer, on } from "@ngrx/store";

import { IAuthState } from "./auth-state.model";
import { AuthActions, AuthApiActions } from "./auth.actions";

export const initialAuthState: IAuthState = {
    user: null,
    isLoading: false,
};

const authReducer = createReducer<IAuthState>(
    initialAuthState,
    on(AuthApiActions.userLoad, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(AuthApiActions.userLoadSuccess, (state, { user }) => {
        return {
            ...state,
            isLoading: false,
            user: user
        };
    }),
    on(AuthApiActions.userLoadFailure, (state) => {
        return {
            ...state,
            isLoading: false,
            user: null
        };
    }),
    on(AuthActions.userLogout, (state, { user }) => {
        return {
            ...state,
            isLoading: true,
            user: user
        };
    }),
);

export const authFeature = createFeature({
    name: 'auth',
    reducer: authReducer
})