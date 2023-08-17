import { Injectable } from '@angular/core';

import { createEffect, ofType } from '@ngneat/effects';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { ApiService } from '../services';
import { createUserTeam, loadActivePlayers, loadNews, loadNewsDetails, loadUserTeam, updateUserTeam } from './app.actions';
import { AppRepository } from './app.repository';

@Injectable()
export class AppEffects {
    constructor(private _apiService: ApiService, private _appRepository: AppRepository) {}

    loadNews$ = createEffect(actions => 
        actions.pipe(
          ofType(loadNews),
          tap(() => this._appRepository.updateNews({ data: null, loading: true })),
          switchMap(() => this._apiService.getNews()),
          tap(news => this._appRepository.updateNews({ data: news, loading: false }))
        )
    )

    loadNewsDetails$ = createEffect(actions => 
        actions.pipe(
          ofType(loadNewsDetails),
          tap(() => this._appRepository.updateNews({ data: null, loading: true })),
          switchMap((action) => this._apiService.getNewsDetails(action.newsId)),
          tap(newsDetails => this._appRepository.updateNewsDetails({data: newsDetails, loading: false}))
        )
    )

    loadActivePlayers$ = createEffect(actions => 
        actions.pipe(
          ofType(loadActivePlayers),
          tap(() => this._appRepository.updateNews({ data: null, loading: true })),
          switchMap(() => this._apiService.getActivePlayers()),
          tap(activePlayers => this._appRepository.updateActivePlayers({ data: activePlayers, loading: false }))
        )
    )

    loadUserTeam$ = createEffect(actions => 
        actions.pipe(
          ofType(loadUserTeam),
          withLatestFrom(this._appRepository.selectUserTeam()),
          tap(([action, userTeam]) => {
            return this._appRepository.updateUserTeam({ data: !userTeam ? userTeam : userTeam?.data, loading: true });
          }),
          switchMap(([action, userTeam]) => {
            if (userTeam !== null) {
              return of(userTeam).pipe(
                tap(() => this._appRepository.updateUserTeam({ data: userTeam.data, loading: false }))
              );
            } else {
              return this._apiService.getUserTeam().pipe(
                tap((userTeamData) => this._appRepository.updateUserTeam({ data: userTeamData, loading: false }))
              );
            }
          })
        )
    )

    createUserTeam$ = createEffect(actions => 
      actions.pipe(
        ofType(createUserTeam),
        switchMap((action) => this._apiService.createUserTeam(action.name).pipe(
          map(response => ({ userTeam: response, error: null })),
          catchError(error => {
            return of({ userTeam: null, error: error.error.error.statusMessage });
          })
        )),
        tap(response => {
          this._appRepository.updateUserTeam({ data: response.userTeam, loading: false, error: response.error })
        }),
      )
    )

    updateUserTeam$ = createEffect(actions => 
      actions.pipe(
        ofType(updateUserTeam),
        withLatestFrom(this._appRepository.selectUserTeam()),
        tap(([action, userTeam]) => {
          return this._appRepository.updateUserTeam({ data: !userTeam ? userTeam : userTeam?.data, loading: true });
        }),
        switchMap(([action, userTeam]) => {
          return this._apiService.updateUserTeam(action.userTeam).pipe(
            map(response => ({ userTeam: response, error: null })),
            catchError(error => {
              return of({ userTeam: null, error: error.error.error.statusMessage });
            })
          )
        }),
        tap(response => {
          this._appRepository.updateUserTeam({ data: response.userTeam, loading: false, error: response.error })
        }),
      )
    )
}