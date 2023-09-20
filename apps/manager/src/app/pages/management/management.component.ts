import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Observable, filter, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { Store } from '@ngrx/store';

import { IPlayer, IUser, IUserTeam } from '@models';
import { CreateNewTeamPopupComponent } from '../../shared/components';
import { BaseComponent } from '@nx/shared/components';
import { NameFilterPipe, PositionFilterPipe } from './pipes';
import { UserTeamApiActions, UserTeamActions, userTeamFeature } from '@store/user-team';
import { authFeature } from '@store/auth';
import { PlayersApiActions, playersFeature } from '@store/players';


@Component({
  selector: 'nx-management',
  templateUrl: './management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgxPaginationModule,
    NameFilterPipe,
    PositionFilterPipe,
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
  searchTerm!: string;
  selectedPosition = '';
  userTeam!: IUserTeam;
  activePlayers$: Observable<IPlayer[]> = this._store.select(playersFeature.selectPlayers);
  activePlayersLoading$: Observable<boolean> = this._store.select(playersFeature.selectIsLoading);
  userTeam$: Observable<IUserTeam | null> = this._store.select(userTeamFeature.selectUserTeam);
  userTeamLoading$: Observable<boolean> = this._store.select(userTeamFeature.selectIsLoading);
  user$: Observable<IUser | null> = this._store.select(authFeature.selectUser);

  constructor(
    private _dialog: MatDialog,
    private _store: Store,
  ) {
    super();
  }

  ngOnInit() {
    this._store.dispatch(PlayersApiActions.playersLoad());

    this.user$.pipe(
      takeUntil(this.destroy$),
      filter(user => !!user?.teamId)
    ).subscribe(
      () => this._store.dispatch(UserTeamApiActions.userTeamLoad())
    )
  }

  onCreateNewTeam(): void {
    this._dialog.open(CreateNewTeamPopupComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: true
    });
  }

  onAddToTeamClick(player: IPlayer): void {
    this._store.dispatch(UserTeamActions.userTeamAddPlayer({player}))
  }

  removePlayerFromTeam(player: IPlayer): void {
    this._store.dispatch(UserTeamActions.userTeamRemovePlayer({player}))
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
