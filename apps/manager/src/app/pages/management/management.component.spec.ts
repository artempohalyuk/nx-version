import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ManagementComponent } from "./management.component";
import { PlayersApiActions, UserTeamActions, UserTeamApiActions } from "../../store";
import { IPlayer } from "@models";
import { CreateNewTeamPopupComponent } from "../../shared/components";
import { MatDialogModule } from "@angular/material/dialog";
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IUser } from "@nx/shared/types";
import { authFeature } from "@nx/shared/store";

describe('ManagementComponent', () => {
    let component: ManagementComponent;
    let fixture: ComponentFixture<ManagementComponent>;
    let store: MockStore;
    const mockUser: IUser = {
        firstName: "Artem",
        lastName: "Artem",
        email: "bla@bla.bla",
        teamId: '123',
        id: '1'
    }

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
        store.overrideSelector(
            authFeature.selectUser,
            mockUser
        )
        // why we always spy on dispatch? Do we need that in all tests
        jest.spyOn(store, 'dispatch');
        // what if we need to change something in test? How we can replace a selector for example? 
        fixture.detectChanges();
    });

    it('should dispatch PlayersApiActions.playersLoad()', () => {
        component.ngOnInit();
        // how do we know that this was called from this particular call to ngOnInit and not from fixture.detectChanges? 
        // is that required that call to dispatch is made from ngOnInit or when component is initialized? 
        expect(store.dispatch).toHaveBeenCalledWith(PlayersApiActions.playersLoad());
    });

    it('should dispatch UserTeamApiActions.userTeamLoad()', () => {
        component.ngOnInit();
        // how do we know that this was called from this particular call to ngOnInit and not from fixture.detectChanges? 
        // is that required that call to dispatch is made from ngOnInit or when component is initialized? 
        expect(store.dispatch).toHaveBeenCalledWith(UserTeamApiActions.userTeamLoad());
    });

    it('should add players to the team ', () => {
        const player = {} as IPlayer;

        component.onAddToTeamClick(player);
        expect(store.dispatch).toHaveBeenCalledWith(UserTeamActions.userTeamAddPlayer({player}));
    });

    it('should change current page', () => {
        const page = 2;

        component.onPageChange(page);
        expect(component.currentPage).toEqual(page);
    });

    it('should open CreateNewTeamPopupComponent dialog', () => {
        const mockConfig = {
            width: '400px',
            disableClose: true,
            autoFocus: true
        };

        jest.spyOn(component.dialog, 'open');
        component.onCreateNewTeam();
        expect(component.dialog.open).toHaveBeenCalledWith(
            CreateNewTeamPopupComponent,
            mockConfig
        );
    });

    it('should load user team if teamId exist', async () => {
        // why we need to spy on subscribe if it is never called
        jest.spyOn(component.user$, 'subscribe');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(store.dispatch).toHaveBeenCalledWith(UserTeamApiActions.userTeamLoad());
    });
})