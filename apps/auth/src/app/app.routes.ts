import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'logout',
        loadComponent: () => import('./logout/logout.component').then(m => m.LogoutComponent)
      },
      {
        path: 'registration',
        loadComponent: () => import('./registration/registration.component').then(m => m.RegistrationComponent)
      }
    ]
  },
];