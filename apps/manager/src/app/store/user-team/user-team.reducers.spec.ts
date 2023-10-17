import { IPlayer } from "../../shared/models/player.model";
import { UserTeamActions, UserTeamApiActions } from "./user-team.actions";
import { initialUserTeamState, userTeamFeature } from "./user-team.reducers"

describe('UserTeamReducer', () => {
    it('should return the default state on unknown action', () => {
        const action = {type: 'UNKNOWN_ACTION'};
        const state = userTeamFeature.reducer(undefined, action);

        expect(state).toStrictEqual(initialUserTeamState);
    })

    it('should set isLoading to true on userTeamLoad action', () => {
        const initialState = { ...initialUserTeamState, isLoading: false };
        const userTeamLoadAction = UserTeamApiActions.userTeamLoad;
        const state = userTeamFeature.reducer(initialState, userTeamLoadAction);
    
        expect(state.isLoading).toBe(true);
    });

    it('should set userTeam and isLoading to false on userTeamLoadSuccess action', () => {
        const mockUserTeamData = {
            id: '1',
            players: [],
            name: 'Mock Team Name'
        };
        const initialState = { ...initialUserTeamState, isLoading: true };
        const userTeamLoadActionSuccess = UserTeamApiActions.userTeamLoadSuccess({ userTeam: mockUserTeamData });
        const state = userTeamFeature.reducer(initialState, userTeamLoadActionSuccess);
    
        expect(state.userTeam).toEqual(mockUserTeamData);
        expect(state.isLoading).toBe(false);
    });

    it('should add a player to userTeam on userTeamAddPlayer action', () => {
        const playerToAdd = {} as IPlayer;
        const mockUserTeamData = {
            id: '1',
            players: [],
            name: 'Mock Team Name'
        };
        const initialState = { 
            ...initialUserTeamState,
            isLoading: true,
            userTeam: mockUserTeamData
        };
        const userTeamAddPlayerAction = UserTeamActions.userTeamAddPlayer({ player: playerToAdd });
        const state = userTeamFeature.reducer(initialState, userTeamAddPlayerAction);
        const updatedPlayers = [playerToAdd, ...initialState.userTeam.players];
    
        expect(state.userTeam?.players).toStrictEqual(updatedPlayers);
        expect(state.isLoading).toBe(false);
    });
})