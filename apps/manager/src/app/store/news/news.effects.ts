import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { map, switchMap } from "rxjs";

import { NewsService } from "src/app/services";
import { INews } from "@models";
import { NewsApiActions, NewsDetailsApiActions } from "./news.actions";

const loadNews = createEffect((
    actions$ = inject(Actions),
    newsService = inject(NewsService)
) => 
    actions$.pipe(
        ofType(NewsApiActions.newsLoad.type),
        switchMap(() => newsService.getNews()),
        map((news: INews[]) => NewsApiActions.newsLoadSuccess({news}))
    ), { functional: true }
)

const loadNewsDetails = createEffect((
    actions$ = inject(Actions),
    newsService = inject(NewsService)
) => 
    actions$.pipe(
        ofType(NewsDetailsApiActions.newsDetailsLoad.type),
        switchMap(({newsId}) => newsService.getNewsDetails(newsId)),
        map((newsDetails: INews) => NewsDetailsApiActions.newsDetailsLoadSuccess({newsDetails}))
    ), { functional: true }
)

export const NewsEffects = {
    loadNews,
    loadNewsDetails
}