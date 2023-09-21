import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

import { Observable, map } from "rxjs";

import { IHttpResponse, IUser } from "@nx/shared/types";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        @Inject('API_URL') private readonly _apiEndpoint: string,
        private _http: HttpClient
    ) {}

    getCurrentUser(): Observable<IUser> {
        return this._http.get<IHttpResponse<IUser>>(`${this._apiEndpoint}/user`)
            .pipe(
                map(({payload}) => payload)
            );
    }
}