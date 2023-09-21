import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { INews } from '@nx/shared/types';
import { NewsDetailsApiActions, newsFeature } from '@nx/shared/store';

@Component({
  selector: 'nx-news-details',
  templateUrl: './news-details.component.html',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  styles: [`
    :host {
      display: flex;
      flex: 1;
    }

    .news-details-page { 
      flex: 1;
      background: url("/assets/manager/news-bg.jpg") no-repeat center; background-size: cover;
    }
  `]
})
export class NewsDetailsComponent implements OnInit {
    newsDetails$: Observable<INews | null> = this._store.select(newsFeature.selectNewsDetails);
    newsDetailsLoader$: Observable<boolean> = this._store.select(newsFeature.selectNewsDetailsLoading);

    constructor(
      private _store: Store,
      private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
      const newsId = this._activatedRoute.snapshot.paramMap.get('id');

      this._store.dispatch(NewsDetailsApiActions.newsDetailsLoad({newsId}));
    }

}
