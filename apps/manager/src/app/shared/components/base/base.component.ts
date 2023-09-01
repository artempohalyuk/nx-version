import { Injectable, OnDestroy } from "@angular/core";

import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseComponent implements OnDestroy {
  destroy$ = new Subject<void>();
 
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}