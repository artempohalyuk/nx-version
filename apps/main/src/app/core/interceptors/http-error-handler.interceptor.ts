import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorsNotifierService } from 'src/app/services';
import { HttpStatus } from 'src/app/shared/enums';
import * as authActions from '@store';

export function HttpErrorHandlerInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const errorsNotifierService = inject(ErrorsNotifierService);
  const router = inject(Router);
  const store = inject(Store);

  return next(request).pipe(
    catchError(
      (response: any): Observable<never> => {
        if (response instanceof HttpErrorResponse) {
          switch (response.status) {
            case HttpStatus.Unauthorized: {
              store.dispatch(authActions.userLogout({
                user: null
              }));
              router.navigate(['/auth']);
              break;
            }

            case HttpStatus.BadRequest: {
              return throwError(() => response);
            }
          }
        }

        errorsNotifierService.dispatchErrors(response);
        return throwError(() => response);
      },
    ),
  )
}