import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "@env";
import { Observable, map } from "rxjs";
import { INews } from "../shared/models/news.model";
import { IHttpResponse } from "../shared/models/http-response.model";

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private _apiEndpoint = environment.apiEndpoint;

    constructor(
        private _http: HttpClient
    ) {}

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