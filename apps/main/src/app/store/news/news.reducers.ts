import { createReducer, on } from "@ngrx/store";

import * as newsActions from './index';
import { INewsState } from "./news-state.model";

export const initialNewsState: INewsState = {
    news: [],
    newsLoading: false,
    newsDetails: null,
    newsDetailsLoading: false
};

export const newsReducer = createReducer<INewsState>(
    initialNewsState,
    on(newsActions.loadNews, (state) => {
        return {
            ...state,
            newsLoading: true
        };
    }),
    on(newsActions.loadNewsSuccess, (state, { news }) => {
        return {
            ...state,
            newsLoading: false,
            news
        };
    }),
    on(newsActions.loadNewsDetails, (state) => {
        return {
            ...state,
            newsDetailsLoading: true,
        };
    }),
    on(newsActions.loadNewsDetailsSuccess, (state, { newsDetails }) => {
        return {
            ...state,
            newsDetails,
            newsDetailsLoading: false,
        };
    }),
);