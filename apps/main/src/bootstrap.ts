import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, HttpClientModule, MatSnackBarModule),
    provideRouter(APP_ROUTES, withEnabledBlockingInitialNavigation())
  ],
}).catch((err) =>
  console.error(err)
);