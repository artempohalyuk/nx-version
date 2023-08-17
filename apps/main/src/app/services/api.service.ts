import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable, map } from "rxjs";

import { IHttpResponse, INews, IPlayer, IUser } from "../shared/models";
import { environment } from '@env';
import { IUserTeam } from "../shared/models/user-team.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private _http = inject(HttpClient);
    private _apiEndpoint = environment.apiEndpoint;

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

    getActivePlayers(): Observable<IPlayer[]> {
        return this._http.get<IHttpResponse<IPlayer[]>>(`${this._apiEndpoint}/players/active`)
            .pipe(
                map(({payload}) => payload)
            );
    }

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

    getCurrentUser(): Observable<IUser> {
        return this._http.get<IHttpResponse<IUser>>(`${this._apiEndpoint}/user`)
            .pipe(
                map(({payload}) => payload)
            );
    }
}