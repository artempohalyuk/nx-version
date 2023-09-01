import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

import { StorageHelper } from 'src/app/utils';
import { StorageKey } from 'src/app/shared';

export function AuthInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const token = StorageHelper.getItemAsString(localStorage, StorageKey.Token);

  if (token) {
    request = request.clone({
      headers: request.headers.append('Authorization', token),
    });
  }
  return next(request);
}
