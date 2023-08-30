import { createFeatureSelector, createSelector } from "@ngrx/store";

import { INewsState } from "./news-state.model";

export const selectNewsState = createFeatureSelector<INewsState>('news');
export const selectNewsList = createSelector(selectNewsState, (state) => state.news);
export const selectNewsLoading = createSelector(selectNewsState, (state) => state.newsLoading);
export const selectNewsDetails = createSelector(selectNewsState, (state) => state.newsDetails);
export const selectNewsDetailsLoading = createSelector(selectNewsState, (state) => state.newsDetailsLoading);