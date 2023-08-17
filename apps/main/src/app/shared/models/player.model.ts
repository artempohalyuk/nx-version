export interface IPlayer {
    id: string;
    playerID: number;
    sportsDataID: string;
    status: string;
    teamID: number;
    team: string;
    jersey: number;
    positionCategory: string;
    position: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    birthCity: string;
    birthState: string;
    birthCountry: string;
    globalTeamID: number;
    height: number;
    weight: number;
}