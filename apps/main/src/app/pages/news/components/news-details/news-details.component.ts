import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Actions } from '@ngneat/effects-ng';
import { Observable, map } from 'rxjs';

import { INews } from '@models';
import { AppRepository, loadNewsDetails } from 'src/app/store';

@Component({
  selector: 'app-news-details',
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
    newsDetails$: Observable<INews | null> = this._appRepository.newsDetails$.pipe(map((res) => res?.data ?? null));
    newsDetailsLoader$: Observable<boolean> = this._appRepository.newsDetails$.pipe(map((res) => res?.loading ?? false));

    constructor(
      private actions: Actions,
      private _appRepository: AppRepository,
      private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
      const newsId = this._activatedRoute.snapshot.paramMap.get('id');

      this.actions.dispatch(loadNewsDetails(String(newsId)));
    }

}
