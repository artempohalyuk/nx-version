import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ManagementComponent } from "./management.component";
import { PlayersActions, PlayersApiActions, UserTeamActions, UserTeamApiActions } from "../../store";
import { IPlayer } from "@models";
import { CreateNewTeamPopupComponent } from "../../shared/components";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IUser } from "@nx/shared/types";
import { authFeature } from "@nx/shared/store";
import { of } from "rxjs";

describe('ManagementComponent', () => {
    let component: ManagementComponent;
    let fixture: ComponentFixture<ManagementComponent>;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
            ],
            providers: [
                provideMockStore()
            ]
        });

        fixture = TestBed.createComponent(ManagementComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    describe('ngOnInit', () => {
        it('should dispatch PlayersApiActions.playersLoad()', () => {
            const action = PlayersApiActions.playersLoad();
            const spy = jest.spyOn(store, 'dispatch');

            component.ngOnInit();

            expect(spy).toHaveBeenCalledWith(action);
        });
    
        it('should load user team if teamId exist', () => {
            const mockUser: IUser = {
                firstName: "Artem",
                lastName: "Artem",
                email: "bla@bla.bla",
                teamId: '123',
                id: '1'
            }
            const spy = jest.spyOn(store, 'dispatch');
    
            store.overrideSelector(
                authFeature.selectUser,
                mockUser
            )
    
            component.ngOnInit();
    
            expect(spy).toHaveBeenCalledWith(UserTeamApiActions.userTeamLoad());
        });
    
        it('should not load user team if teamId not exist', () => {
            const mockUser: IUser = {
                firstName: "Artem",
                lastName: "Artem",
                email: "bla@bla.bla",
                teamId: '',
                id: '1'
            }
            const spy = jest.spyOn(store, 'dispatch');
    
            store.overrideSelector(
                authFeature.selectUser,
                mockUser
            )
    
            component.ngOnInit();
    
            expect(spy).not.toHaveBeenCalledWith(UserTeamApiActions.userTeamLoad());
        });
    })

    it('should add players to the team ', () => {
        const player = {} as IPlayer;
        const action = UserTeamActions.userTeamAddPlayer({player});
        const spy = jest.spyOn(store, 'dispatch');

        component.onAddToTeamClick(player);
        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should remove player from the team ', () => {
        const player = { id: '1' } as IPlayer;
        const action = UserTeamActions.userTeamRemovePlayer({player});
        const spy = jest.spyOn(store, 'dispatch');

        component.removePlayerFromTeam(player);
        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should change current page', () => {
        const page = 2;

        component.onPageChange(page);
        expect(component.currentPage).toEqual(page);
    });

    it('should dispatch PlayersActions.playersFilterByName on search change', () => {
        const search = 'John';
        const action = PlayersActions.playersFilterByName({search});
        const spy = jest.spyOn(store, 'dispatch');

        component.onSearchChange(search);
        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should dispatch PlayersActions.playersFilterByName on search change', () => {
        const position = 'PG';
        const action = PlayersActions.playersFilterByPosition({position});
        const spy = jest.spyOn(store, 'dispatch');

        component.onPositionChange(position);
        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should open CreateNewTeamPopupComponent dialog', () => {
        const matDialog = TestBed.inject(MatDialog);
        const spy = jest.spyOn(matDialog, 'open');
        const mockConfig = {
            width: '400px',
            disableClose: true,
            autoFocus: true
        };

        component.onCreateNewTeam();
        expect(spy).toHaveBeenCalledWith(
            CreateNewTeamPopupComponent,
            mockConfig
        );
    });

    // test is failing 
    // it('should load user team if teamId exist', async () => {
    //     // why we need to spy on subscribe if it is never called
    //     jest.spyOn(component.user$, 'subscribe');
    //     fixture.detectChanges();
    //     await fixture.whenStable();
    //     expect(store.dispatch).toHaveBeenCalledWith(UserTeamApiActions.userTeamLoad());
    // });
})