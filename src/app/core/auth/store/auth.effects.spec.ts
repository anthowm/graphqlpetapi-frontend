import { Router } from '@angular/router';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { cold } from 'jasmine-marbles';
import { of, throwError, EMPTY } from 'rxjs';

import {
    LocalStorageService
} from '@app/core';

import {
    AuthActionTypes,
    Signup,
    Signin,
    Logout,
    SetToken,
    SignupSuccess,
    SigninSuccess,
    RetrieveError
} from './auth.action';

import { AuthEffects, AUTH_KEY } from './auth.effects';
import { CreateUserGQL, SignInGQL, UserInputData } from '@app/generated/graphql';

describe('AuthEffects', () => {
    let localStorageService: jasmine.SpyObj<LocalStorageService>;
    let router: jasmine.SpyObj<Router>;
    let createUserGQL: jasmine.SpyObj<CreateUserGQL>;
    let signInGQL: jasmine.SpyObj<SignInGQL>;

    beforeEach(() => {
        localStorageService = jasmine.createSpyObj('LocalStorageService', [
            'setItem'
        ]);
        router = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
        createUserGQL = jasmine.createSpyObj('CreateUserGQL', ['mutate']);
        signInGQL = jasmine.createSpyObj('SignInGQL', ['watch']);
    });

    describe('signup', () => {
        it('should emit SignupSuccess and SetToken on success with localStorage setItem', () => {
            const userData: UserInputData = { name: 'test', email: 'test@test.com', password: 'secretsecret' };
            const mutationCreateUser = {
                id: '5c50364149012d0c8cf0fb37',
                name: 'test',
                email: 'test@test.com'
            };
            const watchLogin = {
                data: {
                    login: {
                        token: '1234566787',
                        userId: '5c50364149012d0c8cf0fb37'
                    }
                }
            };
            const signupAction = new Signup(userData);
            const expectedValues = {
                b: new SignupSuccess,
                c: new SetToken(watchLogin.data.login.token)
            };
            const source = cold('a', { a: signupAction });
            const expected = cold('(bc)', expectedValues);
            const actions = new Actions(source);
            createUserGQL.mutate.and.returnValue(of(mutationCreateUser));
            signInGQL.watch.and.returnValue({
                valueChanges: of(watchLogin)
            });
            const effect = new AuthEffects(actions, router, localStorageService, createUserGQL, signInGQL);
            expect(effect.signup$).toBeObservable(expected);
            effect.signup$.subscribe(() => {
                expect(localStorageService.setItem).toHaveBeenCalledWith(AUTH_KEY,
                    { token: watchLogin.data.login.token, isAuthenticated: true }
                );
            });
        });

        /* it('should emit RetrieveError on error', () => {
            const userData: UserInputData = { name: 'test', email: 'test@test.com', password: 'secretsecret' };
            const signupAction = new Signup(userData);
            const error = 'ERROR';
            const errorAction = new RetrieveError({
                error: error
            });
            const valueSource = {
                a: signupAction
            };
            const valueSourceError = {
                e: errorAction
            };
            const source = cold('a', valueSource);
            const expected = cold('e', valueSourceError);
            console.log('TCL: expected', expected);
            const actions = new Actions(source);

            createUserGQL.mutate.and.returnValue(throwError(error));

            const effect = new AuthEffects(actions, router, localStorageService, createUserGQL, signInGQL);

            effect.signup$.subscribe((res) => console.log(res));
            console.log('TCL: effect.signup$', effect.signup$);
            expect(effect.signup$).toBeObservable(expected);
        }); */
    });

    describe('login', () => {
        it('should emit SigninSuccess and SetToken on success with localStorage setItem', () => {
            const userData: { email: string, password: string } = { email: 'test@test.com', password: 'secretsecret' };
            const watchLogin = {
                data: {
                    login: {
                        token: '1234566787',
                        userId: '5c50364149012d0c8cf0fb37'
                    }
                }
            };
            const signinAction = new Signin(userData);
            const expectedValues = {
                b: new SigninSuccess,
                c: new SetToken(watchLogin.data.login.token)
            };
            const source = cold('a', { a: signinAction });
            const expected = cold('(bc)', expectedValues);
            const actions = new Actions(source);
            signInGQL.watch.and.returnValue({
                valueChanges: of(watchLogin)
            });
            const effect = new AuthEffects(actions, router, localStorageService, createUserGQL, signInGQL);
            expect(effect.signin$).toBeObservable(expected);
            effect.signin$.subscribe(() => {
                expect(localStorageService.setItem).toHaveBeenCalledWith(AUTH_KEY,
                    { token: watchLogin.data.login.token, isAuthenticated: true }
                );
            });
        });
    });

    describe('logout', () => {
        it('should not dispatch any action', () => {
            const actions = new Actions(EMPTY);
            const effect = new AuthEffects(actions, router, localStorageService, createUserGQL, signInGQL);
            const metadata = getEffectsMetadata(effect);

            expect(metadata.logout$).toEqual({ dispatch: false });
        });

        it('should call setItem on LocalStorageService and navigate to about', () => {
            const logoutAction = new Logout();
            const source = cold('a', { a: logoutAction });
            const actions = new Actions(source);
            const effect = new AuthEffects(actions, router, localStorageService, createUserGQL, signInGQL);
            effect.logout$.subscribe(() => {
                expect(localStorageService.setItem).toHaveBeenCalledWith(AUTH_KEY, { token: null, isAuthenticated: false });
                expect(router.navigate).toHaveBeenCalledWith(['/']);
            });
        });
    });
});
