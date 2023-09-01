import { createFeatureSelector, createSelector } from "@ngrx/store";

import { IPlayersState } from "./players-state.model";

export const selectPlayersState = createFeatureSelector<IPlayersState>('players');
export const selectPlayersList = createSelector(selectPlayersState, (state) => state.players);
export const selectPlayersLoading = createSelector(selectPlayersState, (state) => state.isLoading);