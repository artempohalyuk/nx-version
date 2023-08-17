import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Observable, map } from 'rxjs';
import { Actions } from '@ngneat/effects-ng';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { INews } from '@models';
import { CreateNewTeamPopupComponent, SidebarNewsComponent } from 'src/app/shared/components';
import { AppRepository, loadNews, loadUserTeam } from 'src/app/store';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SidebarNewsComponent, CommonModule, MatProgressSpinnerModule],
  styles: [`
    :host {
      display: flex;
      flex: 1;
    }
  
    .home-page {
      flex: 1;
      background: url('/assets/main-bg.jpg') no-repeat center; background-size: cover;
    }
  `]
})
export class HomeComponent implements OnInit {
  userTeam$: Observable<any> = this._appRepository.userTeam$.pipe(map((res) => res?.data ?? null));
  userTeamLoading$: Observable<any> = this._appRepository.userTeam$.pipe(map((res) => res?.loading ?? null));
  newsList$: Observable<INews[] | null> = this._appRepository.news$.pipe(map((res) => res?.data ?? null));
  newsLoading$: Observable<boolean> = this._appRepository.news$.pipe(map((res) => res?.loading ?? false));

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _actions: Actions,
    private _appRepository: AppRepository,
    private _authService: AuthService) { }

  ngOnInit() {
    this._actions.dispatch(loadNews());

    if (this._authService.getCurrentUser()?.teamId) {
      this._actions.dispatch(loadUserTeam());
    }
  }

  onCreateNewTeam(): void {
    const dialogRef = this._dialog.open(CreateNewTeamPopupComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(
      (userTeam) => {
        if (userTeam) {
          this._router.navigate(['/management']);
        }
      }
    )
  }

  onManageClick(): void {
    this._router.navigate(['/management']);
  }
}
