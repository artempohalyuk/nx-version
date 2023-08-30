import { INews } from "@models";

export interface INewsState {
    news: INews[];
    newsLoading: boolean;
    newsDetails: INews | null;
    newsDetailsLoading: boolean;
}