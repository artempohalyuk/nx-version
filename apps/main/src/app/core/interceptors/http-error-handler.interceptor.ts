import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService, ErrorsNotifierService } from 'src/app/services';
import { HttpStatus } from 'src/app/shared/enums';

export function HttpErrorHandlerInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const errorsNotifierService = inject(ErrorsNotifierService);
  const router = inject(Router);

  return next(request).pipe(
    catchError(
      (response: any): Observable<never> => {
        if (response instanceof HttpErrorResponse) {
          switch (response.status) {
            case HttpStatus.Unauthorized: {
              authService.clear();
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