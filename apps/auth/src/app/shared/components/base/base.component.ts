import { Component, OnDestroy } from "@angular/core";

import { Subject } from "rxjs";

@Component({
  template: ``,
  standalone: true
})
// it is duplicated in auth and manager
// better move it to a separate package
export class BaseComponent implements OnDestroy {
  destroy$ = new Subject<void>();
 
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}