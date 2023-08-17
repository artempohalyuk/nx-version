import { Injectable } from '@angular/core';

import { Observable, of, share, tap } from 'rxjs';

import { IUser } from '../shared/models';
import { StorageHelper } from '../utils';
import { StorageKey } from '../shared';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    protected currentUser$!: Observable<IUser> | null;
    protected currentUser!: IUser | null;
  
    constructor(
      private _apiService: ApiService,
      private _router: Router
    ) {}
  
    getCurrentUser$(): Observable<IUser> {
      if (this.currentUser) {
        return of(this.currentUser);
      }
      if (this.currentUser$) {
        return this.currentUser$;
      }
      return (this.currentUser$ = this._apiService
        .getCurrentUser()
        .pipe(
          share(),
          tap((currentUser: IUser): void => {
            this.currentUser$ = null;
            this.currentUser = currentUser;
          }),
        ));
    }

    getCurrentUser(): IUser | null {
      return this.currentUser;
    }

    setCurrentUser(user: IUser | null): void {
      this.currentUser = user;
    }
  
    logout(): void {
      this.clear();
      // window.location.href = `${environment.authUrl}/logout`;
      this._router.navigate(['/auth']);
    }
  
    isLoggedIn(): boolean {
      return StorageHelper.hasItem(localStorage, StorageKey.Token);
    }
  
    getToken(): string {
      return StorageHelper.getItemAsString(localStorage, StorageKey.Token)!;
    }
  
    clear(): void {
      this.currentUser = null;
      StorageHelper.setItem(localStorage, StorageKey.Token, null);
    }
}
