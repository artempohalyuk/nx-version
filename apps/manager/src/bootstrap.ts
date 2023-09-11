import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, withEnabledBlockingInitialNavigation } from "@angular/router";

import { AppComponent } from "./app/app.component";
import { APP_ROUTES } from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, withEnabledBlockingInitialNavigation())
  ],
}).catch((err) =>
  console.error(err)
);