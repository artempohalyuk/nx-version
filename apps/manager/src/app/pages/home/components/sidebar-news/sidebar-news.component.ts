import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { INews } from '@nx/shared/types';
import { SidebarNewsItemComponent } from './sidebar-news-item';

@Component({
  selector: 'nx-sidebar-news',
  templateUrl: './sidebar-news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SidebarNewsItemComponent, CommonModule, MatProgressSpinnerModule]
})
export class SidebarNewsComponent {
  @Input() newsLoading!: boolean | null;
  @Input() newsList: INews[] | null = [];
}
