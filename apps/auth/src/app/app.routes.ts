import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './service';
import { provideHttpClient } from '@angular/common/http';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: AppComponent,
    providers: [
      AuthService,
      provideHttpClient()
    ],
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
        path: 'registration',
        loadComponent: () => import('./registration/registration.component').then(m => m.RegistrationComponent)
      }
    ]
  },
];