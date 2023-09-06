import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, map } from "rxjs";

import { environment } from "@env";
import { IHttpResponse } from "../shared/models/http-response.model";
import { IUserTeam } from "../shared/models/user-team.model";

@Injectable({
    providedIn: 'any'
})
export class UserTeamService {
    private _apiEndpoint = environment.apiEndpoint;

    constructor(
        private _http: HttpClient
    ) {}

    getUserTeam(): Observable<IUserTeam> {
        return this._http.get<IHttpResponse<IUserTeam>>(`${this._apiEndpoint}/teams/load`)
            .pipe(
                map(({payload}) => payload)
            );
    }

    createUserTeam(name: string): Observable<IUserTeam> {
        return this._http.post<IHttpResponse<IUserTeam>>(`${this._apiEndpoint}/teams/create`, {name})
            .pipe(
                map(({payload}) => payload)
            );
    }

    removeUserTeam(): Observable<boolean> {
        return this._http.delete<IHttpResponse<boolean>>(`${this._apiEndpoint}/teams/remove`)
            .pipe(
                map(({payload}) => payload)
            );
    }

    updateUserTeam(userTeam: IUserTeam): Observable<IUserTeam> {
        const playerIds = userTeam.players.map( player => player.id );

        return this._http.put<IHttpResponse<IUserTeam>>(`${this._apiEndpoint}/teams/update`, {playerIds})
            .pipe(
                map(({payload}) => payload)
            );
    }
}