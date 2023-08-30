import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { INews } from '@models';
import * as newsActions from '@store';

@Component({
  selector: 'nx-news-details',
  templateUrl: './news-details.component.html',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host {
      display: flex;
      flex: 1;
    }

    .news-details-page { 
      flex: 1;
      background: url("/assets/news-bg.jpg") no-repeat center; background-size: cover;
    }
  `]
})
export class NewsDetailsComponent implements OnInit {
    newsDetails$: Observable<INews | null> = this._store.select(newsActions.selectNewsDetails);
    newsDetailsLoader$: Observable<boolean> = this._store.select(newsActions.selectNewsDetailsLoading);

    constructor(
      private _store: Store,
      private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
      const newsId = this._activatedRoute.snapshot.paramMap.get('id');

      this._store.dispatch(newsActions.loadNewsDetails({newsId}));
    }

}
