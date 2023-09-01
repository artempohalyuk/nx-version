import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from "@angular/core";

import { provideRouter, withEnabledBlockingInitialNavigation } from "@angular/router";

import { AppComponent } from "./app/app.component";
import { APP_ROUTES } from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
    ),
    provideRouter(APP_ROUTES, withEnabledBlockingInitialNavigation())
  ],
}).catch((err) =>
  console.error(err)
);