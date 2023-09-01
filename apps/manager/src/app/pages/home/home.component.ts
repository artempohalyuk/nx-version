import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Observable, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';

import { INews, IUserTeam } from '@models';
import { BaseComponent, CreateNewTeamPopupComponent, SidebarNewsComponent } from 'src/app/shared/components';
import * as newsActions from '@store/news';
import * as userTeamActions from '@store/user-team';
import * as authActions from '@store/auth';

@Component({
  selector: 'nx-home',
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
export class HomeComponent extends BaseComponent implements OnInit {
  userTeam$: Observable<IUserTeam | null> = this._store.select(userTeamActions.selectUserTeam);
  userTeamLoading$: Observable<boolean> = this._store.select(userTeamActions.selectUserTeamLoading);
  newsList$: Observable<INews[]> = this._store.select(newsActions.selectNewsList);
  newsLoading$: Observable<boolean> = this._store.select(newsActions.selectNewsLoading);


  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _store: Store,
  ) {
    super();
  }

  ngOnInit() {
    this._store.dispatch(newsActions.loadNews());
    this._store.select(authActions.selectUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (user) => {
          if (user?.id) {
            this._store.dispatch(userTeamActions.loadUserTeam());
          }
        }
      )
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
