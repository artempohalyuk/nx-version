import { IPlayer } from "@models";

export interface IPlayersState {
    players: IPlayer[];
    filteredPlayers: IPlayer[];
    isLoading: boolean;
}