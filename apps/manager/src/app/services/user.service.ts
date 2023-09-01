import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, map } from "rxjs";

import { environment } from "@env";
import { IHttpResponse } from "../shared/models/http-response.model";
import { IUser } from "../shared/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _apiEndpoint = environment.apiEndpoint;

    constructor(
        private _http: HttpClient
    ) {}

    getCurrentUser(): Observable<IUser> {
        return this._http.get<IHttpResponse<IUser>>(`${this._apiEndpoint}/user`)
            .pipe(
                map(({payload}) => payload)
            );
    }
}