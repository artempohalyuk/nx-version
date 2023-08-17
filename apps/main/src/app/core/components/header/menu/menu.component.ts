import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [RouterModule]
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
