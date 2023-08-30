import { Component } from '@angular/core';

import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'nx-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [MenuComponent, UserComponent]
})
export class HeaderComponent {

}
