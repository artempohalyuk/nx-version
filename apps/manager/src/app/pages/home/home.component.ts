import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Observable, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';

import { INews, IUserTeam } from '@models';
import { CreateNewTeamPopupComponent, SidebarNewsComponent } from '../../shared/components';
import { BaseComponent } from '@nx/shared/components';
import { UserTeamApiActions, userTeamFeature } from '@store/user-team';
import { NewsApiActions, newsFeature } from '@nx/shared/store';
import { authFeature } from '@store/auth';

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
      background: url('/assets/manager/main-bg.jpg') no-repeat center; background-size: cover;
    }
  `]
})
export class HomeComponent extends BaseComponent implements OnInit {
  userTeam$: Observable<IUserTeam | null> = this._store.select(userTeamFeature.selectUserTeam);
  userTeamLoading$: Observable<boolean> = this._store.select(userTeamFeature.selectIsLoading);
  newsList$: Observable<INews[]> = this._store.select(newsFeature.selectNews);
  newsLoading$: Observable<boolean> = this._store.select(newsFeature.selectNewsLoading);


  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _store: Store,
  ) {
    super();
  }

  ngOnInit() {
    this._store.dispatch(NewsApiActions.newsLoad());
    this._store.select(authFeature.selectUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (user) => {
          if (user?.id) {
            this._store.dispatch(UserTeamApiActions.userTeamLoad());
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
          this.navigateManagement();
        }
      }
    )
  }

  onManageClick(): void {
    this.navigateManagement();
  }

  navigateManagement(): void {
    this._router.navigate(['management'], { relativeTo: this._activatedRoute.parent });
  }
}
