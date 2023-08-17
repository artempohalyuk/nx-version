import { Injectable } from "@angular/core";

import { createStore, select, withProps  } from "@ngneat/elf";

import { INews, IPlayer, IUserTeam } from "@models";

export interface IStoreData<T> {
    data: T | null,
    loading: boolean;
    error?: string;
}

interface StoreProps {
    news: IStoreData<INews[]> | null;
    newsDetails: IStoreData<INews> | null;
    activePlayers: IStoreData<IPlayer[]> | null;
    userTeam: IStoreData<IUserTeam>  | null
}

const store = createStore(
    { name: 'appStore' },
    withProps<StoreProps>({
        news: null,
        newsDetails: null,
        activePlayers: null,
        userTeam: null
    })
);

@Injectable({
    providedIn: 'root'
})
export class AppRepository {
    news$ = store.pipe(select((state) => state.news));
    newsDetails$ = store.pipe(select((state) => state.newsDetails));
    activePlayers$ = store.pipe(select((state) => state.activePlayers));
    userTeam$ = store.pipe(select((state) => state.userTeam));

    updateNews(news: StoreProps['news']) {
        store.update((state) => ({
            ...state,
            news,
        }));
    }

    updateNewsDetails(newsDetails: StoreProps['newsDetails']) {
        store.update((state) => ({
            ...state,
            newsDetails,
        }));
    }

    updateActivePlayers(activePlayers: StoreProps['activePlayers']) {
        store.update((state) => ({
            ...state,
            activePlayers,
        }));
    }

    selectUserTeam() {
        return store.pipe(select((state) => state.userTeam));
    }

    updateUserTeam(userTeam: StoreProps['userTeam'], error?: string) {
        store.update((state) => ({
            ...state,
            userTeam,
            error
        }));
    }
}