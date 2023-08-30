import { createFeatureSelector, createSelector } from "@ngrx/store";

import { IUserTeamState } from "./user-team-state.model";

export const selectUserTeamState = createFeatureSelector<IUserTeamState>('userTeam');
export const selectUserTeam = createSelector(selectUserTeamState, (state) => state.userTeam);
export const selectUserTeamErrors = createSelector(selectUserTeamState, (state) => state.error);
export const selectUserTeamLoading = createSelector(selectUserTeamState, (state) => state.isLoading);