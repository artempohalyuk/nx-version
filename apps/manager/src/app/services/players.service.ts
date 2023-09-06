import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, map } from "rxjs";

import { environment } from "@env";
import { IPlayer } from "../shared/models/player.model";
import { IHttpResponse } from "../shared/models/http-response.model";

@Injectable({
    providedIn: 'any'
})
export class PlayersService {
    private _apiEndpoint = environment.apiEndpoint;

    constructor(
        private _http: HttpClient
    ) {}

    getActivePlayers(): Observable<IPlayer[]> {
        return this._http.get<IHttpResponse<IPlayer[]>>(`${this._apiEndpoint}/players/active`)
            .pipe(
                map(({payload}) => payload)
            );
    }
}