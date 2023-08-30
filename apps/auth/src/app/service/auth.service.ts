import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Observable, map } from 'rxjs';
import { IHttpResponse } from '@models';
import { ILoginFormData, IRegistrationFormData } from '../models';


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
