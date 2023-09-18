import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { INews } from '../../models';
import { SidebarNewsItemComponent } from './sidebar-news-item';

@Component({
  selector: 'nx-sidebar-news',
  templateUrl: './sidebar-news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SidebarNewsItemComponent, CommonModule, MatProgressSpinnerModule]
})
// WHY we have it as shared if that is used only in one place
export class SidebarNewsComponent {
  @Input() newsLoading!: boolean | null;
  @Input() newsList: INews[] | null = [];
}
