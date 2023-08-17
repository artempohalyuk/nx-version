import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Observable, map } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { Actions } from '@ngneat/effects-ng';

import { INews } from '@models';
import { AppRepository, loadNews } from 'src/app/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-news',
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
  p: number = 1;
  newsList$: Observable<INews[] | null> = this._appRepository.news$.pipe(map((res) => res?.data ?? null));
  newsLoader$: Observable<boolean> = this._appRepository.news$.pipe(map((res) => res?.loading ?? false));

  constructor(
    private actions: Actions,
    private _appRepository: AppRepository
  ) { }

  ngOnInit() {
    this.actions.dispatch(loadNews());
  }

}
