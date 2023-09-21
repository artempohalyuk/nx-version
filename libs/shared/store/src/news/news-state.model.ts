import { INews } from "@nx/shared/types";

export interface INewsState {
    news: INews[];
    newsLoading: boolean;
    newsDetails: INews | null;
    newsDetailsLoading: boolean;
}