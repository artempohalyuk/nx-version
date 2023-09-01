import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'manager',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule('auth', './Module').then((m) => m.APP_ROUTES),
  },
  {
    path: 'manager',
    loadChildren: () =>
      loadRemoteModule('manager', './Module').then((m) => m.APP_ROUTES),
  },
];
