import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
    Signup, Signin, AuthActionTypes, RetrieveError, SignupSuccess, SetToken, SigninSuccess
} from './auth.action';
import { map, switchMap, mergeMap, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/core/local-storage/local-storage.service';
import { CreateUserGQL, SignInGQL } from '@app/generated/graphql';

export const AUTH_KEY = 'AUTH';
@Injectable()
export class AuthEffects {
    userSignup = null;
    @Effect()
    signup$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.SIGNUP),
        map((action: Signup) => action.payload),
        switchMap((user: any) => {
            this.userSignup = user;
            return this.createUserGQL.mutate({ userInput: user });
        }),
        switchMap(() => {
            return this.signInGQL.watch({
                email: this.userSignup.email,
                password: this.userSignup.password
            }).valueChanges.pipe(map((login: any) => {
                const authData = login.data.login;
                return authData;
            }));
        }),
        mergeMap((res: any) => {
            const token = res.token;
            this.localStorageService.setItem(AUTH_KEY, { token: token, isAuthenticated: true });
            return [new SignupSuccess, new SetToken(token)];
        }),
        catchError(err => {
            return of(new RetrieveError({ error: err }));
        })
    );

    @Effect()
    signin$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.SIGNIN),
        map((action: Signin) => action.payload),
        switchMap((user: any) => {
            return this.signInGQL.watch({
                email: user.email,
                password: user.password
            }).valueChanges.pipe(map((login: any) => {
                const authData = login.data.login;
                return authData;
            }));
        }),
        mergeMap((res: any) => {
            const token = res.token;
            this.localStorageService.setItem(AUTH_KEY, { token: token, isAuthenticated: true });
            return [new SigninSuccess, new SetToken(token)];
        }),
        catchError(err => {
            return of(new RetrieveError({ error: err }));
        })
    );

    @Effect({ dispatch: false })
    logout$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap(() => {
            this.localStorageService.setItem(AUTH_KEY, { token: null, isAuthenticated: false });
            this.router.navigate(['/']);
        })
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private localStorageService: LocalStorageService,
        private createUserGQL: CreateUserGQL,
        private signInGQL: SignInGQL
    ) { }
}
