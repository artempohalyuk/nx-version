import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from "@angular/core";

import { provideRouter, withEnabledBlockingInitialNavigation } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { provideStore } from "@ngrx/store";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AppComponent } from "./app/app.component";
import { APP_ROUTES } from "./app/app.routes";
import { AuthInterceptor, HttpErrorHandlerInterceptor } from "./app/interceptors";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      MatSnackBarModule
    ),
    provideHttpClient(
      withInterceptors([
        AuthInterceptor,
        HttpErrorHandlerInterceptor
      ])
    ),
    provideStore(),
    provideRouter(APP_ROUTES, withEnabledBlockingInitialNavigation())
  ],
}).catch((err) =>
  console.error(err)
);