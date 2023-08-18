import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from "@angular/core";
import { HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter, withEnabledBlockingInitialNavigation } from "@angular/router";

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideEffects, provideEffectsManager } from "@ngneat/effects-ng";

import { AppComponent } from "./app/app.component";
import { APP_ROUTES } from "./app/app.routes";
import { AppEffects } from "./app/store";
import { AuthInterceptor, HttpErrorHandlerInterceptor } from "./app/core";

bootstrapApplication(AppComponent, {
  providers: [
    provideEffectsManager(),
    provideEffects(AppEffects),
    provideHttpClient(
      withInterceptors([
        HttpErrorHandlerInterceptor,
        AuthInterceptor
      ])
    ),
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, HttpClientModule, MatSnackBarModule),
    provideRouter(APP_ROUTES, withEnabledBlockingInitialNavigation())
  ],
}).catch((err) =>
  console.error(err)
);