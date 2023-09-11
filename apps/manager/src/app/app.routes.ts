import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { NewsEffects, newsReducer } from './store/news';
import { UserTeamEffects, userTeamReducer } from './store/user-team';
import { PlayersEffects, playersReducer } from './store/players';
import { AuthEffects, authReducer } from './store/auth';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuard } from './shared/guards';
import { AppComponent } from './app.component';


export const APP_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppComponent,
    providers: [
      importProvidersFrom(
        MatDialogModule
      ),
      provideState('auth', authReducer),
      provideState('userTeam', userTeamReducer),
      provideState('news', newsReducer),
      provideEffects(NewsEffects, UserTeamEffects, AuthEffects),
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      { 
        path: 'home',
        loadComponent: () => import('./pages/home').then(m => m.HomeComponent),
      },
      { path: 'management', 
        loadComponent: () => import('./pages/management').then(m => m.ManagementComponent),
        providers: [
          provideState('players', playersReducer),
          provideEffects(PlayersEffects),
        ],
      },
      { 
        path: 'news',
        loadChildren: () => import('./pages/news/news.routes').then(m => m.NEWS_ROUTES),
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule('auth', './Module').then((m) => m.APP_ROUTES),
  },
];