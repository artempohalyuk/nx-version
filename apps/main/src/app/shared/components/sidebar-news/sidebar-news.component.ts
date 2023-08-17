import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { INews } from '../../models';
import { SidebarNewsItemComponent } from './sidebar-news-item';

@Component({
  selector: 'app-sidebar-news',
  templateUrl: './sidebar-news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SidebarNewsItemComponent, CommonModule, MatProgressSpinnerModule]
})
export class SidebarNewsComponent implements OnInit {
  @Input() newsLoading!: boolean | null;
  @Input() newsList: INews[] | null = [];

  constructor() { }

  ngOnInit() {
  }

}
