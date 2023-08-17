import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { AuthGuard } from './shared/guards';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/home').then(m => m.HomeComponent) },
      { path: 'management', loadComponent: () => import('./pages/management').then(m => m.ManagementComponent) },
      { path: 'news', loadChildren: () => import('./pages/news/news.routes').then(m => m.NEWS_ROUTES) }
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule('auth', './Module').then((m) => m.APP_ROUTES),
  },
];
