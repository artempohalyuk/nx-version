import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterModule } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';

import { ErrorsNotifierService } from './services';
import { HeaderComponent } from './core/components';
import * as authActions from '@store';

@Component({
  selector: 'nx-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatProgressSpinnerModule,
    RouterModule,
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  user$ = this._store.select(authActions.selectUser);
  isLoading!: boolean;

  constructor(
    private _errorsNotifierService: ErrorsNotifierService,
    private _router: Router,
    private _store: Store
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
