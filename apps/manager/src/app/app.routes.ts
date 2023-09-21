import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MatDialogModule } from '@angular/material/dialog';

import { NewsEffects, newsFeature, DialogEffects, AuthEffects, authFeature } from '@nx/shared/store';
import { UserTeamEffects, userTeamFeature } from './store/user-team';
import { PlayersEffects, playersFeature } from './store/players';
import { AuthGuard } from './shared/guards';
import { AppComponent } from './app.component';
import { environment } from '@env';
import { NewsService, UserService } from '@nx/shared/services';


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
      provideEffects(NewsEffects, UserTeamEffects, AuthEffects, DialogEffects),
      UserService,
      NewsService,
      {
        provide: 'API_URL', useValue: environment.apiEndpoint
      }
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
        loadChildren: () => import('@nx/news').then(m => m.NEWS_ROUTES),
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule('auth', './Module').then((m) => m.APP_ROUTES),
  },
];