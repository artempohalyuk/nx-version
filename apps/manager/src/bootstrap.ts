import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from "@angular/core";
import { HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter, withEnabledBlockingInitialNavigation } from "@angular/router";

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideStore } from "@ngrx/store";
import { MatDialogModule } from "@angular/material/dialog";

import { AppComponent } from "./app/app.component";
import { APP_ROUTES } from "./app/app.routes";
import { AuthInterceptor, HttpErrorHandlerInterceptor } from "./app/core";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([
        HttpErrorHandlerInterceptor,
        AuthInterceptor
      ])
    ),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MatSnackBarModule,
      MatDialogModule,
    ),
    provideStore(),
    provideRouter(APP_ROUTES, withEnabledBlockingInitialNavigation())
  ],
}).catch((err) =>
  console.error(err)
);