import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Observable, takeUntil, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { Store, select } from '@ngrx/store';

import { IPlayer, IUser, IUserTeam } from '@models';
import { BaseComponent, CreateNewTeamPopupComponent } from 'src/app/shared/components';
import { NameFilterPipe, PositionFilterPipe } from './pipes';
import * as playersActions from '@store/players';
import * as userTeamActions from '@store/user-team';
import * as authActions from '@store/auth';


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
      background: url("/assets/team-bg.jpg") no-repeat center; background-size: cover;
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
  activePlayers$: Observable<IPlayer[]> = this._store.select(playersActions.selectPlayersList);
  activePlayersLoading$: Observable<boolean> = this._store.select(playersActions.selectPlayersLoading);
  userTeam$: Observable<IUserTeam | null> = this._store.pipe(
    select(userTeamActions.selectUserTeam),
    tap((userTeam) => {
      if (userTeam) {
        this.userTeam = userTeam;
      }
    })
  );
  userTeamLoading$: Observable<boolean> = this._store.select(userTeamActions.selectUserTeamLoading);
  user$: Observable<IUser | null> = this._store.select(authActions.selectUser);

  constructor(
    private _dialog: MatDialog,
    private _store: Store,
  ) {
    super();
  }

  ngOnInit() {
    this._store.dispatch(playersActions.loadPlayers());

    this.user$.pipe(takeUntil(this.destroy$)).subscribe(
      (user) => {
        if (user?.teamId) {
          this._store.dispatch(userTeamActions.loadUserTeam())
        }
      }
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
    const updatedPlayers = [player, ...this.userTeam.players];

    this._store.dispatch(userTeamActions.addPlayerToUserTeam({userTeam: {...this.userTeam, players: updatedPlayers}}));
  }

  removePlayerFromTeam(player: IPlayer): void {
    const updatedPlayers = this.userTeam.players.filter(p => p.id !== player.id);

    this._store.dispatch(userTeamActions.removePlayerFromUserTeam({ userTeam: {...this.userTeam, players: updatedPlayers}}));
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
