import { IUserTeam } from "@models";

export interface IUserTeamState {
    userTeam: IUserTeam | null;
    isLoading: boolean;
    error: string | undefined;
}