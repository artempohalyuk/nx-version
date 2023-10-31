import { TestBed } from "@angular/core/testing";
import { UserTeamEffects } from "./user-team.effects";
import { UserTeamActions, UserTeamApiActions } from "./user-team.actions";
import { of, throwError } from "rxjs";
import { UserTeamService } from "../../services";
import { IUserTeam } from "../../shared/models/user-team.model";
import { IHttpErrorResponse } from "@nx/shared/types";
import { IPlayer } from "../../shared/models/player.model";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { cold, hot } from "jest-marbles";
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from "@ngrx/effects";
import { userTeamFeature } from "./user-team.reducers";

const mockUserTeam: IUserTeam = {
  id: '1',
  players: [],
  name: 'Mock User Team Name'
}

const mockStore = {
  selectors: [
    {
      selector: userTeamFeature.selectUserTeam,
      value: mockUserTeam
    }
  ]
};

describe('UserTeamEffects', () => {
  let userTeamServiceSpy: any;
  let actions$: Actions;
  let store: MockStore;

  beforeEach(() => {
    userTeamServiceSpy = {
      getUserTeam: jest.fn().mockReturnValue(of(mockUserTeam)),
      removeUserTeam: jest.fn().mockReturnValue(of(true)),
    }
  
    TestBed.configureTestingModule({
      // why we need to provide it here?
      providers: [
        {
          provide: UserTeamService,
          useValue: userTeamServiceSpy,
        },
        provideMockStore(mockStore),
        // why we need to provide it here?
        provideMockActions(() => actions$)
      ]
    })

    store = TestBed.inject(MockStore);
  })

  it('should load user team and dispatch userTeamLoadSuccess', () => {
    const action = UserTeamApiActions.userTeamLoad();
    const outcome = UserTeamApiActions.userTeamLoadSuccess({ userTeam: mockUserTeam });

    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: outcome });

    expect(UserTeamEffects.loadUserTeam(actions$, userTeamServiceSpy)).toBeObservable(expected);
  });

  it('should return an error on server error', () => {
    const action = UserTeamApiActions.userTeamLoad();
    const errorMessage = 'Error occurred';
    const errorResponse = { error: { error: { statusMessage: errorMessage } } } as IHttpErrorResponse;

    actions$ = hot('-a', { a: action });
    userTeamServiceSpy.getUserTeam = jest.fn(() => throwError(() => errorResponse));
    const expected = cold('-#', { b: errorResponse });

    expect(UserTeamEffects.loadUserTeam(actions$, userTeamServiceSpy)).toBeObservable(expected);
  });

  it('should handle multiple userTeamLoad actions', () => {
    const action = UserTeamApiActions.userTeamLoad();
    const outcome = UserTeamApiActions.userTeamLoadSuccess({ userTeam: mockUserTeam });
    // What is the difference between cold and hot?
    actions$ = hot('-a--b', { a: action, b: action });
    const expected = cold('-c--d', { c: outcome, d: outcome });

    expect(UserTeamEffects.loadUserTeam(actions$, userTeamServiceSpy)).toBeObservable(expected);
  });

  it('should create user team and dispatch userTeamCreateSuccess', () => {
    const action = UserTeamApiActions.userTeamCreate({ name: 'New Team Name' });
    const mockNewUserTeam: IUserTeam = {
      id: '2',
      name: 'New Team Name',
      players: []
    };
    const outcome = UserTeamApiActions.userTeamCreateSuccess({ userTeam: mockNewUserTeam });

    actions$ = hot('-a', { a: action });
    userTeamServiceSpy.createUserTeam = jest.fn(() => of(mockNewUserTeam));

    const expected = cold('-b', { b: outcome });

    expect(UserTeamEffects.createUserTeam(actions$, userTeamServiceSpy)).toBeObservable(expected);
  });

  it('should handle errors on createUserTeam and dispatch userTeamCreateFailure', () => {
    const action = UserTeamApiActions.userTeamCreate({ name: 'New Team Name' });
    const errorMessage = 'Error occurred';
    const errorResponse = { error: { error: { statusMessage: errorMessage } } } as IHttpErrorResponse;
    const outcome = UserTeamApiActions.userTeamCreateFailure({ error: errorMessage });

    actions$ = hot('-a', { a: action });
    userTeamServiceSpy.createUserTeam = jest.fn(() => throwError(() => errorResponse));

    const expected = cold('-b', { b: outcome });

    expect(UserTeamEffects.createUserTeam(actions$, userTeamServiceSpy)).toBeObservable(expected);
  });

  it('should add a player to the user team and dispatch userTeamUpdateSuccess', () => {
    const playerToAdd = {} as IPlayer;
    const action = UserTeamActions.userTeamAddPlayer({ player: playerToAdd });
    const userTeam = {
      id: '1',
      players: [playerToAdd],
      name: 'Mock Team Name'
    };
    const outcome = UserTeamApiActions.userTeamUpdateSuccess({ userTeam: userTeam });

    actions$ = hot('-a', { a: action });
    userTeamServiceSpy.updateUserTeam = jest.fn(() => of(userTeam));

    const expected = cold('-b', { b: outcome });

    expect(UserTeamEffects.addPlayerToUserTeam(actions$, userTeamServiceSpy, store)).toBeObservable(expected);
  });

  it('should remove a player from user team and dispatch userTeamUpdateSuccess', () => {
    const players = [
      {
        id: '1'
      } as IPlayer,
      {
        id: '2',
      } as IPlayer
    ]
    const player = { id: '1' } as IPlayer;
    const action = UserTeamActions.userTeamRemovePlayer({ player });
    const filteredPlayers = players.filter(p => p.id !== player.id);
    const userTeam = {
      id: '1',
      players: filteredPlayers,
      name: 'Mock Team Name'
    };
    const outcome = UserTeamApiActions.userTeamUpdateSuccess({ userTeam: userTeam });

    actions$ = hot('-a', { a: action });
    userTeamServiceSpy.updateUserTeam = jest.fn(() => of(userTeam));

    const expected = cold('-b', { b: outcome });

    expect(UserTeamEffects.removePlayerFromUserTeam(actions$, userTeamServiceSpy, store)).toBeObservable(expected);
  });

  it('should remove user team and dispatch userTeamLoadSuccess', () => {
    const action = UserTeamApiActions.userTeamRemove();
    const outcome = UserTeamApiActions.userTeamRemoveSuccess({ status: true });

    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: outcome });

    expect(UserTeamEffects.removeUserTeam(actions$, userTeamServiceSpy)).toBeObservable(expected);
  });

  // no timing or sequence test
})