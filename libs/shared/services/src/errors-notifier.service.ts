import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { IHttpErrorResponse } from '@nx/shared/types';

@Injectable({
  providedIn: 'root',
})
export class ErrorsNotifierService {
  private error$ = new Subject<IHttpErrorResponse>();

  constructor(private _snackbar: MatSnackBar) {}

  run(): void {
    this.error$
      .subscribe((response: IHttpErrorResponse) => {
        this.handleError(response);
      });
  }

  stop(): void {
    this.error$.complete();
  }

  dispatchErrors(error: IHttpErrorResponse): void {
    this.error$.next(error);
  }

  handleError(httpErrorResponse: IHttpErrorResponse) {
    this._snackbar.open(
      httpErrorResponse.error.error?.statusMessage || 'Something went wrong. We are already working on it!',
      'Close',
      {
        verticalPosition: 'top',
        horizontalPosition: 'right'
      }
    );
  }
}
