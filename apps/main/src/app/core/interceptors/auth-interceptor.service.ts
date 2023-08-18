import { inject } from '@angular/core';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

import { AuthService } from 'src/app/services';

export function AuthInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    request = request.clone({
      headers: request.headers.append('Authorization', authService.getToken()),
    });
  }
  return next(request);
}
