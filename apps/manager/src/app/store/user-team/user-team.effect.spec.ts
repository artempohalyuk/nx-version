import { TestBed } from "@angular/core/testing";
import { UserTeamEffects } from "./user-team.effects";
import { UserTeamActions, UserTeamApiActions } from "./user-team.actions";
import { of, throwError } from "rxjs";
import { UserTeamService } from "../../services";
import { IUserTeam } from "../../shared/models/user-team.model";
import { IHttpErrorResponse } from "@nx/shared/types";
import { IPlayer } from "../../shared/models/player.model";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

describe('UserTeamEffects', () => {
  let userTeamService: UserTeamService;
  let store: Store;
  const mockUserTeam: IUserTeam = {
    id: '1',
    players: [],
    name: 'Mock Team Name'
  };

  beforeEach(() => {
    // Do we really need to create a testing module? 
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserTeamService,
          useValue: {
            getUserTeam: jest.fn(),
            createUserTeam: jest.fn(),
            updateUserTeam: jest.fn(),
            removeUserTeam: jest.fn(),
          },
        },
        provideMockStore(),
      ]
    })

    // why not to use it as a const that is provided above? 
    userTeamService = TestBed.inject(UserTeamService);
     // it is used only in one test. Why do we need to create it before each test? 
    store = TestBed.inject(MockStore);
  })

  it('should load user team and dispatch userTeamLoadSuccess', (done) => {
    const userTeamLoadAction$ = of(UserTeamApiActions.userTeamLoad());

    userTeamService.getUserTeam = jest.fn(() => of(mockUserTeam));

    UserTeamEffects.loadUserTeam(userTeamLoadAction$, userTeamService).subscribe((result) => {
      expect(result).toEqual(UserTeamApiActions.userTeamLoadSuccess({ userTeam: mockUserTeam }));
      done();
    });
  });

  it('should create user team and dispatch userTeamCreateSuccess', (done) => {
    const userTeamCreateAction$ = of(UserTeamApiActions.userTeamCreate({ name: 'New Team Name' }));
    const mockNewUserTeam: IUserTeam = {
      id: '2',
      name: 'New Team Name',
      players: []
    }

    userTeamService.createUserTeam = jest.fn(() => of(mockNewUserTeam));

    UserTeamEffects.createUserTeam(userTeamCreateAction$, userTeamService).subscribe((result) => {
      expect(result).toEqual(UserTeamApiActions.userTeamCreateSuccess({ userTeam: mockNewUserTeam }));
      done();
    });
  });

  it('should handle errors on createUserTeam and dispatch userTeamCreateFailure', (done) => {
    const userTeamCreateAction$ = of(UserTeamApiActions.userTeamCreate({ name: 'New Team Name' }));
    const errorMessage = 'Error occurred';
    const errorResponse = { error: { error: { statusMessage: errorMessage } } } as IHttpErrorResponse;

    userTeamService.createUserTeam = jest.fn(() => throwError(() => errorResponse));

    UserTeamEffects.createUserTeam(userTeamCreateAction$, userTeamService).subscribe((result) => {
      expect(result).toEqual(UserTeamApiActions.userTeamCreateFailure({ error: errorMessage }));
      done();
    });
  });

  it('should add a player to the user team and dispatch userTeamUpdateSuccess', (done) => {
    const playerToAdd = {} as IPlayer;
    const addPlayerToUserTeamAction$ = of(UserTeamActions.userTeamAddPlayer({ player: playerToAdd }));

    userTeamService.updateUserTeam = jest.fn(() => of(mockUserTeam));

    // where we test the call param? 
    // where we mock store selector? 

    UserTeamEffects.addPlayerToUserTeam(addPlayerToUserTeamAction$, userTeamService, store).subscribe((result) => {
      // here we test that team is still empty? 
      expect(result).toEqual(UserTeamApiActions.userTeamUpdateSuccess({ userTeam: mockUserTeam }));
      done();
    });
  });

  // no timing or sequence test

  // not all methods are covered by tests

  // only one negative test

})