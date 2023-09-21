import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Injector } from "@angular/core";

import { Observable, map } from "rxjs";
import { IHttpResponse, INews } from "@nx/shared/types";

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    public bla = Injector
    constructor(
        @Inject('API_URL') private readonly _apiEndpoint: string,
        private _http: HttpClient
    ) { }

    getNews(): Observable<INews[]> {
        return this._http.get<IHttpResponse<INews[]>>(`${this._apiEndpoint}/news`)
            .pipe(
                map(({payload}) => payload)
            );
    }

    getNewsDetails(newsId: string): Observable<INews> {
        return this._http.get<IHttpResponse<INews>>(`${this._apiEndpoint}/news/${newsId}`)
            .pipe(
                map(({payload}) => payload)
            );
    }
}