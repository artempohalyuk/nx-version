import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Observable, map } from 'rxjs';
import { Actions } from '@ngneat/effects-ng';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

import { IPlayer, IUser, IUserTeam } from '@models';
import { AuthService } from 'src/app/services';
import { CreateNewTeamPopupComponent } from 'src/app/shared/components';
import { NameFilterPipe, PositionFilterPipe } from './pipes';
import { AppRepository, loadActivePlayers, loadUserTeam, updateUserTeam } from 'src/app/store';


@Component({
  selector: 'app-management',
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
export class ManagementComponent implements OnInit {
  currentPage: number = 1;
  searchTerm!: string;
  selectedPosition: string = '';
  userTeam!: IUserTeam;
  activePlayers$: Observable<IPlayer[] | null> = this._appRepository.activePlayers$.pipe(map((res) => res?.data ?? null));
  activePlayersLoading$: Observable<boolean> = this._appRepository.activePlayers$.pipe(map((res) => res?.loading ?? false));
  userTeam$: Observable<IUserTeam | null> = this._appRepository.userTeam$.pipe(
    map((res) => {
      if (res?.data) {
        this.userTeam = res?.data;
      }

      return res?.data ?? null;
    })
  );
  userTeamLoading$: Observable<boolean> = this._appRepository.userTeam$.pipe(map((res) => res?.loading ?? false));

  get currentUser(): IUser | null {
    return this._authService.getCurrentUser();
  }

  constructor(
    private _dialog: MatDialog,
    private _actions: Actions,
    private _appRepository: AppRepository,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._actions.dispatch(loadActivePlayers());

    if (this.currentUser?.teamId) {
      this._actions.dispatch(loadUserTeam());
    }
  }

  onCreateNewTeam(): void {
    this._dialog.open(CreateNewTeamPopupComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: true
    });
  }

  onAddToTeamClick(player: IPlayer): void {
    this.userTeam.players = [player, ...this.userTeam.players];

    this._actions.dispatch(updateUserTeam(this.userTeam));
  }

  removePlayerFromTeam(player: IPlayer): void {
    this.userTeam.players = this.userTeam.players.filter(p => p.id !== player.id);

    this._actions.dispatch(updateUserTeam(this.userTeam));
  }
}
