import { createFeature, createReducer, on } from "@ngrx/store";

import { INewsState } from "./news-state.model";
import { NewsApiActions, NewsDetailsApiActions } from "./news.actions";

export const initialNewsState: INewsState = {
    news: [],
    newsLoading: false,
    newsDetails: null,
    newsDetailsLoading: false
};

const newsReducer = createReducer<INewsState>(
    initialNewsState,
    on(NewsApiActions.newsLoad, (state) => {
        return {
            ...state,
            newsLoading: true
        };
    }),
    on(NewsApiActions.newsLoadSuccess, (state, { news }) => {
        return {
            ...state,
            newsLoading: false,
            news
        };
    }),
    on(NewsDetailsApiActions.newsDetailsLoad, (state) => {
        return {
            ...state,
            newsDetailsLoading: true,
        };
    }),
    on(NewsDetailsApiActions.newsDetailsLoadSuccess, (state, { newsDetails }) => {
        return {
            ...state,
            newsDetails,
            newsDetailsLoading: false,
        };
    }),
);

export const newsFeature = createFeature({
    name: 'news',
    reducer: newsReducer
})