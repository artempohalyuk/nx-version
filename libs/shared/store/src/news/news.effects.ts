import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { map, switchMap } from "rxjs";

import { NewsService } from "@nx/shared/services";
import { INews } from "@nx/shared/types";
import { NewsApiActions, NewsDetailsApiActions } from "./news.actions";

const loadNews = createEffect((
    actions$ = inject(Actions),
    newsService = inject(NewsService)
) => 
    actions$.pipe(
        ofType(NewsApiActions.newsLoad.type),
        switchMap(() => newsService.getNews().pipe(
            map((news: INews[]) => NewsApiActions.newsLoadSuccess({news}))
        )),
    ), { functional: true }
)

const loadNewsDetails = createEffect((
    actions$ = inject(Actions),
    newsService = inject(NewsService)
) => 
    actions$.pipe(
        ofType(NewsDetailsApiActions.newsDetailsLoad.type),
        switchMap(({newsId}) => newsService.getNewsDetails(newsId).pipe(
            map((newsDetails: INews) => NewsDetailsApiActions.newsDetailsLoadSuccess({newsDetails}))
        )),
    ), { functional: true }
)

export const NewsEffects = {
    loadNews,
    loadNewsDetails
}