import { INews } from "@models";
import { createAction, props } from "@ngrx/store";

export const loadNews = createAction('[News] Load');
export const loadNewsSuccess = createAction(
    `${loadNews.type} Success`,
    props<{
        news: INews[];
    }>()
);
export const loadNewsDetails = createAction('[News Details] Load', props<{
    newsId: string | null;
}>());
export const loadNewsDetailsSuccess = createAction(
    `${loadNewsDetails.type} Success`,
    props<{
        newsDetails: INews;
    }>()
);