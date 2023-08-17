import { HttpErrorResponse } from '@angular/common/http';

import { HttpStatus } from '../enums';
import { IHttpResponse } from '@models';

export interface IHttpErrorResponse extends HttpErrorResponse {
  readonly status: HttpStatus;
  readonly error: {
    error: IHttpResponse | null
  };
}