import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { INews } from '../../../models';

@Component({
  selector: 'nx-sidebar-news-item',
  templateUrl: './sidebar-news-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule]
})
export class SidebarNewsItemComponent {
  @Input() news!: INews;
}
