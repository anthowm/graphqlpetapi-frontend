import { initialState, authReducer } from './auth.reducer';

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

describe('AuthReducer', () => {
    it('should return default state', () => {
        const action = {} as any;
        const state = authReducer(undefined, action);
        expect(state).toBe(initialState);
    });

    it('should signup user', () => {
        const userData: UserInputData = { name: 'test', email: 'test@test.com', password: 'secretsecret' };
        const action = new Signup(userData);
        const state = authReducer(undefined, action);
        expect(state).toBe(initialState);
    });

    it('should signin user', () => {
        const signinData: { email: string, password: string } = { email: 'test@test.com', password: 'secretsecret' };
        const action = new Signin(signinData);
        const state = authReducer(undefined, action);
        expect(state).toBe(initialState);
    });

    it('should logout user', () => {
        const action = new Logout();
        const state = authReducer(undefined, action);
        expect(state.token).toEqual(null);
        expect(state.isAuthenticated).toEqual(false);
    });

    it('should set token to state', () => {
        const tokenData = 'tokensecretsecret';
        const action = new SetToken(tokenData);
        const state = authReducer(undefined, action);
        expect(state.token).toEqual(tokenData);
    });

    it('should set isauthenticated to state - signupsucesss', () => {
        const action = new SignupSuccess();
        const state = authReducer(undefined, action);
        expect(state.isAuthenticated).toEqual(true);
    });

    it('should set isauthenticated to state - signinsucesss', () => {
        const action = new SigninSuccess();
        const state = authReducer(undefined, action);
        expect(state.isAuthenticated).toEqual(true);
    });

    it('should RetrieveError state', () => {
        const action = new RetrieveError(null);
        const state = authReducer(undefined, action);
        expect(state).toBe(initialState);
    });
});
