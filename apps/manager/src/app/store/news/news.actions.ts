import { INews } from "@models";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const NewsApiActions = createActionGroup({
    source: 'News API',
    events: {
        'News Load': emptyProps(),
        'News Load Success': props<{ news: INews[] }>(),
    }
})

export const NewsDetailsApiActions = createActionGroup({
    source: 'News Details API',
    events: {
        'News Details Load': props<{ newsId: string | null }>(),
        'News Details Load Success': props<{ newsDetails: INews }>(),
    }
})