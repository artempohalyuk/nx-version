import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '@env';
import { ILoginFormData, IRegistrationFormData } from '../models';
import { IHttpResponse } from '@nx/shared/types';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
  private _apiEndpoint = environment.apiEndpoint;

  constructor(private _http: HttpClient) {}

  login(formData: ILoginFormData): Observable<{ token: string }> {
      return this._http.post<IHttpResponse<{ token: string }>>(`${this._apiEndpoint}/auth/login`, formData)
          .pipe(
              map(({payload}) => payload)
          );
  }

  registration(formData: IRegistrationFormData): Observable<{ token: string }> {
    return this._http.post<IHttpResponse<{ token: string }>>(`${this._apiEndpoint}/auth/registration`, formData)
        .pipe(
            map(({payload}) => payload)
        );
  }
}
