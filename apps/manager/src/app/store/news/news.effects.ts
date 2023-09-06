import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as newsActions from './index';
import { NewsService } from "src/app/services";
import { INews } from "@models";
import { map, switchMap } from "rxjs";

const loadNews = createEffect(
    (_actions$ = inject(Actions), _newsService = inject(NewsService)) =>         
        _actions$.pipe(
            ofType(newsActions.loadNews.type),
            switchMap(() => _newsService.getNews()),
            map((news: INews[]) => newsActions.loadNewsSuccess({news}))
    ),
    { functional: true }
  );


  const loadNewsDetails = createEffect(
    (_actions$ = inject(Actions), _newsService = inject(NewsService)) =>         
        _actions$.pipe(
            ofType(newsActions.loadNewsDetails.type),
            switchMap(({newsId}) => _newsService.getNewsDetails(newsId)),
            map((newsDetails: INews) => newsActions.loadNewsDetailsSuccess({newsDetails}))
    ),
    { functional: true }
  );

export const NewsEffects = {
    loadNews,
    loadNewsDetails
}