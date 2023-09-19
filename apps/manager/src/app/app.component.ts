import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterModule } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';

import { HeaderComponent } from './core/components';
import { authFeature } from '@store/auth';

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
export class AppComponent {
  user$ = this._store.select(authFeature.selectUser);
  isLoading!: boolean;

  constructor(
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
}
