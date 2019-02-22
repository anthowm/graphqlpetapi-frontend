
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
import { UserInputData } from '@app/generated/graphql';
import { HttpErrorResponse } from '@angular/common/http';

describe('Auth Actions', () => {
    it('should create Signup action', () => {
        const userData: UserInputData = { name: 'test', email: 'test@test.com', password: 'secretsecret' };
        const action = new Signup(userData);
        expect(action.type).toEqual(AuthActionTypes.SIGNUP);
        expect(action.payload).toEqual(userData);
    });

    it('should create Signin action', () => {
        const signinData: { email: string, password: string } = { email: 'test@test.com', password: 'secretsecret' };
        const action = new Signin(signinData);
        expect(action.type).toEqual(AuthActionTypes.SIGNIN);
        expect(action.payload).toEqual(signinData);
    });

    it('should create Logout action', () => {
        const action = new Logout();
        expect(action.type).toEqual(AuthActionTypes.LOGOUT);
    });

    it('should create SetToken action', () => {
        const tokenData = 'tokensecretsecret';
        const action = new SetToken(tokenData);
        expect(action.type).toEqual(AuthActionTypes.SET_TOKEN);
        expect(action.payload).toEqual(tokenData);
    });

    it('should create SignupSuccess action', () => {
        const action = new SignupSuccess();
        expect(action.type).toEqual(AuthActionTypes.SIGNUP_SUCCESS);
    });

    it('should create SigninSuccess action', () => {
        const action = new SigninSuccess();
        expect(action.type).toEqual(AuthActionTypes.SIGNIN_SUCCESS);
    });

    it('should create RetrieveError action', () => {
        const error: { error: HttpErrorResponse } = null;
        const action = new RetrieveError(null);
        expect(action.type).toEqual(AuthActionTypes.RETRIEVE_ERROR);
    });

});

