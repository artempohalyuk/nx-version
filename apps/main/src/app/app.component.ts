import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService, ErrorsNotifierService } from './services';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './core/components';

@Component({
  selector: 'nx-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatProgressSpinnerModule,
    RouterModule,
    MatDialogModule,
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  public get user() {
    return this._authService.getCurrentUser();
  }

  isLoading!: boolean;

  constructor(
    private _errorsNotifierService: ErrorsNotifierService,
    private _authService: AuthService,
    private _router: Router
  ) {
    _router.events.subscribe(
      (event): void => {
        if (event instanceof RouteConfigLoadStart) {
          this.isLoading = true;
        } else if (event instanceof RouteConfigLoadEnd) {
          this.isLoading  = false;
        }
      }
    );
  }

  ngOnInit(): void {
    this._errorsNotifierService.run();
  }

  ngOnDestroy(): void {
    this._errorsNotifierService.stop();
  }
}
