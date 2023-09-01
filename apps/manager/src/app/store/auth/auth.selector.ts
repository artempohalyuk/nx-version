import { createFeatureSelector, createSelector } from "@ngrx/store";

import { IAuthState } from "./auth-state.model";

export const selectAuthState = createFeatureSelector<IAuthState>('auth');
export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectUserLoading = createSelector(selectAuthState, (state) => state.isLoading);