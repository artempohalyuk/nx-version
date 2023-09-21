import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorsNotifierService } from '@nx/shared/services';

@Component({
  selector: 'nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private _errorsNotifierService: ErrorsNotifierService,
  ) {}

  ngOnInit(): void {
    this._errorsNotifierService.run();
  }

  ngOnDestroy(): void {
    this._errorsNotifierService.stop();
  }
}
