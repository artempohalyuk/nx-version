import { IPlayer } from "@models";

export interface IPlayersState {
    players: IPlayer[];
    isLoading: boolean;
}