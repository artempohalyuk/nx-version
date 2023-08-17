import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from 'src/app/services';
import { IUser } from '../models';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser$().pipe(
      switchMap(
        (currentUser: IUser | null) => {
          if (!currentUser) {
            // return this.router.navigateByUrl(`${environment.authUrl}/logout`, { skipLocationChange: true });
            return this.router.navigate(['/auth'], { skipLocationChange: true })
          }

          return of(true);
        }
      )
    )
  }
}
