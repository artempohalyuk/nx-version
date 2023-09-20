import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { NewsEffects, newsFeature } from '@nx/shared/store';
import { UserTeamEffects, userTeamFeature } from './store/user-team';
import { PlayersEffects, playersFeature } from './store/players';
import { AuthEffects, authFeature } from './store/auth';
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
      provideState(authFeature),
      provideState(userTeamFeature),
      provideState(newsFeature),
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
          provideState(playersFeature),
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