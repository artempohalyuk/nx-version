import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ManagementComponent } from "./management.component";
import { Store, StoreModule } from "@ngrx/store";
import { PlayersApiActions, UserTeamActions, UserTeamApiActions, playersFeature, userTeamFeature } from "../../store";
import { IPlayer } from "@models";
import { CreateNewTeamPopupComponent } from "../../shared/components";
import { MatDialogModule } from "@angular/material/dialog";
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from "rxjs";
import { IUser } from "@nx/shared/types";

describe('ManagementComponent', () => {
    let component: ManagementComponent;
    let fixture: ComponentFixture<ManagementComponent>;
    let store: Store;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                ManagementComponent,
                MatDialogModule,
                StoreModule.forRoot(),
                StoreModule.forFeature(userTeamFeature),
                StoreModule.forFeature(playersFeature)
            ],
            providers: [
                provideMockStore({ initialState: {} })
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ManagementComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should dispatch PlayersApiActions.playersLoad()', () => {
        jest.spyOn(store, 'dispatch');
        component.ngOnInit();
        expect(store.dispatch).toHaveBeenCalledWith(PlayersApiActions.playersLoad());
    });

    it('should dispatch UserTeamApiActions.userTeamLoad()', () => {
        component.user$ = of({teamId: '111'} as IUser);
        jest.spyOn(store, 'dispatch');
        component.ngOnInit();
        expect(store.dispatch).toHaveBeenCalledWith(UserTeamApiActions.userTeamLoad());
    });

    it('should add players to the team ', () => {
        const player = {} as IPlayer;

        jest.spyOn(store, 'dispatch');

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
})