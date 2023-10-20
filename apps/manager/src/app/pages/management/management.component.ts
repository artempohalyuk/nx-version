import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Observable, filter, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { Store } from '@ngrx/store';

import { IPlayer, IUserTeam } from '@models';
import { CreateNewTeamPopupComponent } from '../../shared/components';
import { BaseComponent } from '@nx/shared/components';
import { UserTeamApiActions, UserTeamActions, userTeamFeature, PlayersActions } from '@store/user-team';
import { authFeature } from '@nx/shared/store';
import { IUser } from '@nx/shared/types';
import { PlayersApiActions, playersFeature } from '@store/players';


@Component({
  selector: 'nx-management',
  templateUrl: './management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  styles: [`
    :host {
      display: flex;
      flex: 1;
    }

    .management-page {
      flex: 1;
      background: url("/assets/manager/team-bg.jpg") no-repeat center; background-size: cover;
    }

    .management-pagination ::ng-deep .ngx-pagination a { color: white }
  `]
})
export class ManagementComponent extends BaseComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 5;
  searchPlayers!: string;
  selectedPosition = '';
  activePlayers$: Observable<IPlayer[]> = this._store.select(playersFeature.selectPlayers);
  activePlayersLoading$: Observable<boolean> = this._store.select(playersFeature.selectIsLoading);
  filteredPlayers$: Observable<IPlayer[]> = this._store.select(playersFeature.selectFilteredPlayers);
  userTeam$: Observable<IUserTeam | null> = this._store.select(userTeamFeature.selectUserTeam);
  userTeamLoading$: Observable<boolean> = this._store.select(userTeamFeature.selectIsLoading);
  user$: Observable<IUser | null> = this._store.select(authFeature.selectUser);

  constructor(
    // changing something to public just for tests is extremely bad practice
    public dialog: MatDialog,
    private _store: Store,
  ) {
    super();
  }

  ngOnInit() {
    this._store.dispatch(PlayersApiActions.playersLoad());

    this.user$.pipe(
      takeUntil(this.destroy$),
      // there is no test for negative scenario
      // there is no test when what will happen is team is created later
      filter(user => !!user?.teamId)
    ).subscribe(
      () => this._store.dispatch(UserTeamApiActions.userTeamLoad())
    )
  }

  onCreateNewTeam(): void {
    this.dialog.open(CreateNewTeamPopupComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: true
    });
  }

  onAddToTeamClick(player: IPlayer): void {
    this._store.dispatch(UserTeamActions.userTeamAddPlayer({player}))
  }

  removePlayerFromTeam(player: IPlayer): void {
    // is not tested
    this._store.dispatch(UserTeamActions.userTeamRemovePlayer({player}))
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onSearchChange(value: string): void {
    // is not tested
    this._store.dispatch(PlayersActions.playersFilterByName({search: value}));
  }

  onPositionChange(value: string): void {
    // is not tested
    this._store.dispatch(PlayersActions.playersFilterByPosition({position: value}));
  }
}
