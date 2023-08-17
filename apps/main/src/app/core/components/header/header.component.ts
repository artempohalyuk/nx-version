import { Component, OnInit } from '@angular/core';

import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [MenuComponent, UserComponent]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
