import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { INews } from 'src/app/shared/models';

@Component({
  selector: 'app-sidebar-news-item',
  templateUrl: './sidebar-news-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule]
})
export class SidebarNewsItemComponent implements OnInit {
  @Input() news!: INews;

  constructor() { }

  ngOnInit() {
  }

}
