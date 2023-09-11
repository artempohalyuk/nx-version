import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function AuthInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const token = localStorage.getItem('token');

  if (token) {
    request = request.clone({
      headers: request.headers.append('Authorization', token),
    });
  }
  return next(request);
}
