import { Routes } from "@angular/router";

import { NewsComponent } from "./news.component";
import { NewsDetailsComponent } from "./components/news-details/news-details.component";

export const NEWS_ROUTES: Routes = [
    {
        path: "",
        component: NewsComponent,
    },
    {
        path: ":id",
        component: NewsDetailsComponent
    }
]