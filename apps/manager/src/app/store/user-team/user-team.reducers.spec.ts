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
        const state = userTeamFeature.reducer(initialState, UserTeamApiActions.userTeamLoad);

        // what if code just toggles value? Have you checked all the cases?
        expect(state).toEqual({
            ...initialUserTeamState,
            isLoading: true,
            error: undefined
        });
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


    it('should set isLoading to true on userTeamCreate action', () => {
        const initialState = { ...initialUserTeamState, isLoading: false };
        // incorrect action most likely
        const state = userTeamFeature.reducer(initialState, UserTeamApiActions.userTeamLoad);

        expect(state).toEqual({
            ...initialUserTeamState,
            isLoading: true,
            error: undefined
        });
    });

    it('should set isLoading to false and return UserTeam object on userTeamCreateSuccess action', () => {
        const initialState = { ...initialUserTeamState, isLoading: true };
        const mockUserTeamData = {
            id: '1',
            players: [],
            name: 'Mock Team Name'
        };
        const state = userTeamFeature.reducer(initialState, UserTeamApiActions.userTeamCreateSuccess({ userTeam: mockUserTeamData }));

        expect(state.userTeam).toEqual(mockUserTeamData);
        expect(state.isLoading).toBe(false);
    });

    it('should set isLoading to false and return error on userTeamCreateFailure action', () => {
        const initialState = { ...initialUserTeamState, isLoading: true };
        const errorMessage = 'Error occurred';
        const state = userTeamFeature.reducer(initialState, UserTeamApiActions.userTeamCreateFailure({ error: errorMessage }));

        expect(state).toEqual({
            ...initialUserTeamState,
            isLoading: false,
            error: errorMessage
        });
    });

    it('should set isLoading to false on userTeamUpdateSuccess action', () => {
        const initialState = { ...initialUserTeamState, isLoading: false };
        const mockUserTeamData = {
            id: '1',
            players: [{
                id: '1'
            } as IPlayer],
            name: 'Mock Team Name'
        };
        const state = userTeamFeature.reducer(initialState, UserTeamApiActions.userTeamUpdateSuccess({ userTeam: mockUserTeamData }));

        expect(state.userTeam).toEqual(mockUserTeamData);
        expect(state.isLoading).toBe(false);
    });

    it('should set isLoading to true on userTeamRemove action', () => {
        const initialState = { ...initialUserTeamState, isLoading: false };
        const state = userTeamFeature.reducer(initialState, UserTeamApiActions.userTeamRemove);

        expect(state).toEqual({
            ...initialUserTeamState,
            isLoading: true,
            error: undefined
        });
    });

    it('should set isLoading to false on userTeamRemoveSuccess action', () => {
        const initialState = { ...initialUserTeamState, isLoading: false };
        const state = userTeamFeature.reducer(initialState, UserTeamApiActions.userTeamRemoveSuccess);

        expect(state).toEqual({
            ...initialUserTeamState,
            isLoading: false,
            error: undefined
        });
    });

    it('should add a player to userTeam on userTeamAddPlayer action', () => {
        const playerToAdd = { id: '1' } as IPlayer;
        const mockUserTeamData = {
            id: '1',
            // where we test that order is correct? 
            // what if it replaces whole team with one player?
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
        expect(state.userTeam?.players[0].id).toEqual(playerToAdd.id);
        expect(state.isLoading).toBe(true);
    });

    it('should remove a player from userTeam on userTeamRemovePlayer action', () => {
        const playerToRemove = { id: '1' } as IPlayer;
        const mockUserTeamData = {
            id: '1',
            players: [
                {
                    id: '1'
                } as IPlayer,
                {
                    id: '2'
                } as IPlayer
            ],
            name: 'Mock Team Name'
        };
        const initialState = { 
            ...initialUserTeamState,
            isLoading: true,
            userTeam: mockUserTeamData
        };
        const userTeamRemovePlayerAction = UserTeamActions.userTeamRemovePlayer({ player: playerToRemove });
        const state = userTeamFeature.reducer(initialState, userTeamRemovePlayerAction);
        const updatedPlayers = mockUserTeamData.players.filter(p => p.id !== playerToRemove.id);
    
        expect(state.userTeam?.players).toStrictEqual(updatedPlayers);
        expect(state.isLoading).toBe(true);
    });
})