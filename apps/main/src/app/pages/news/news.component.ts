import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { INews } from '@models';
import * as newsActions from '@store';

@Component({
  selector: 'nx-news',
  templateUrl: './news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, RouterModule, MatProgressSpinnerModule],
  styles: [`
    :host {
      display: flex;
      flex: 1;
    }

    .news-page {
      flex: 1;
      background: url("/assets/news-bg.jpg") no-repeat center; background-size: cover;
    }

    .news-pagination ::ng-deep .ngx-pagination a { color: white }
  `]
})
export class NewsComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 6;
  newsList$: Observable<INews[]> = this._store.select(newsActions.selectNewsList);
  newsLoader$: Observable<boolean> = this._store.select(newsActions.selectNewsLoading);

  constructor(
    private _store: Store
  ) { }

  ngOnInit() {
    this._store.dispatch(newsActions.loadNews());
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
  }

}
