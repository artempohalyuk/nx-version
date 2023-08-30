import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as newsActions from './index';
import { NewsService } from "src/app/services";
import { INews } from "@models";
import { map, switchMap } from "rxjs";

@Injectable()
export class NewsEffects {
    constructor(
        private _actions$: Actions,
        private _newsService: NewsService
    ) {}

    loadNews$ = createEffect(() => 
        this._actions$.pipe(
            ofType(newsActions.loadNews.type),
            switchMap(() => this._newsService.getNews()),
            map((news: INews[]) => newsActions.loadNewsSuccess({news}))
        )
    )

    loadNewsDetails$ = createEffect(() => 
        this._actions$.pipe(
            ofType(newsActions.loadNewsDetails.type),
            switchMap(({newsId}) => this._newsService.getNewsDetails(newsId)),
            map((newsDetails: INews) => newsActions.loadNewsDetailsSuccess({newsDetails}))
        )
    )
}