import { IPlayer } from "./player.model";

export interface IUserTeam {
    id: string;
    players: IPlayer[];
    name: string;
}