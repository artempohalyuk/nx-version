import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

import { StorageHelper } from 'src/app/utils';
import { StorageKey } from 'src/app/shared';

export function AuthInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const token = StorageHelper.getItemAsString(localStorage, StorageKey.Token) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NGI2NGY2NWRhM2E4ODg3MjBmN2QiLCJpYXQiOjE2OTM2MzI2NzIsImV4cCI6MTY5MzcxOTA3Mn0.cZWqhQk7ua-oPZ9LRx9-zu71TwO8dZKhGlq8b5xQH8o';

  if (token) {
    request = request.clone({
      headers: request.headers.append('Authorization', token),
    });
  }
  return next(request);
}
