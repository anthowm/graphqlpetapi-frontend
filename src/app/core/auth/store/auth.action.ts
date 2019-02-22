import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInputData } from '@app/generated/graphql';




export enum AuthActionTypes {
    SIGNUP = '[AUTH] SIGNUP',
    SIGNUP_SUCCESS = '[AUTH] SIGNUP_SUCCESS',
    SIGNIN = '[AUTH] SIGNIN',
    SIGNIN_SUCCESS = '[AUTH] SIGNIN_SUCCESS',
    LOGOUT = '[AUTH] LOGOUT',
    RETRIEVE_ERROR = '[AUTH] RETRIEVE ERROR',
    SET_TOKEN = '[AUTH] SET_TOKEN'
}
export class Signup implements Action {
    readonly type = AuthActionTypes.SIGNUP;
    constructor(public payload: UserInputData) { }
}
export class SignupSuccess implements Action {
    readonly type = AuthActionTypes.SIGNUP_SUCCESS;
}

export class Signin implements Action {
    readonly type = AuthActionTypes.SIGNIN;
    constructor(public payload: { email: string, password: string }) { }
}

export class SigninSuccess implements Action {
    readonly type = AuthActionTypes.SIGNIN_SUCCESS;
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export class SetToken implements Action {
    readonly type = AuthActionTypes.SET_TOKEN;
    constructor(public payload: string) { }
}

export class RetrieveError implements Action {
    readonly type = AuthActionTypes.RETRIEVE_ERROR;
    constructor(readonly payload: { error: HttpErrorResponse | any }) { }
}

export type AuthActions = Signup | Signin | Logout | SetToken | SignupSuccess | SigninSuccess | RetrieveError;
