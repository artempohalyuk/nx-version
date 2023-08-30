import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NewsEffects, newsReducer } from './store/news';
import { AuthGuard } from './shared/guards';
import { UserTeamEffects, userTeamReducer } from './store/user-team';
import { PlayersEffects, playersReducer } from './store/players';
import { AuthEffects, authReducer } from './store/auth';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('auth', authReducer),
        StoreModule.forFeature('userTeam', userTeamReducer),
        StoreModule.forFeature('news', newsReducer),
        EffectsModule.forFeature([NewsEffects, UserTeamEffects, AuthEffects])
      )
    ],
    children: [
      { 
        path: '',
        loadComponent: () => import('./pages/home').then(m => m.HomeComponent),
      },
      { path: 'management', 
        loadComponent: () => import('./pages/management').then(m => m.ManagementComponent),
        providers: [
          importProvidersFrom(
            StoreModule.forFeature('players', playersReducer),
            EffectsModule.forFeature([PlayersEffects])
          )
        ],
      },
      { 
        path: 'news',
        loadChildren: () => import('./pages/news/news.routes').then(m => m.NEWS_ROUTES),
      }
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule('auth', './Module').then((m) => m.APP_ROUTES),
  },
];
