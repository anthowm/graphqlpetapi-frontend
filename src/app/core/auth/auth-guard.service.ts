import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../core.state';
import { selectIsAuthenticated } from './store/auth.selectors';
import { take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.handleUnauthorized();
  }

  canLoad(): Observable<boolean> {
    return this.handleUnauthorized();
  }

  handleUnauthorized(): Observable<boolean> {
    const isAuthenticated = this.store.pipe(take(1), select(selectIsAuthenticated), tap((isAuth) => {
      if (!isAuth) {
        this.router.navigate(['/unauthorized']);
      }
    }));
    return isAuthenticated;
  }

}
