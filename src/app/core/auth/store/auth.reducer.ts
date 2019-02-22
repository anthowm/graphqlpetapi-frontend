import { AuthState } from './auth.models';
import { AuthActionTypes, AuthActions as AllAuthActions } from './auth.action';

export const initialState: AuthState = {
    token: null,
    isAuthenticated: false
};

export function authReducer(state: AuthState = initialState, action: AllAuthActions) {
    switch (action.type) {
        case (AuthActionTypes.SIGNUP_SUCCESS):
            return {
                ...state,
                isAuthenticated: true
            };
        case (AuthActionTypes.SIGNIN_SUCCESS):
            return {
                ...state,
                isAuthenticated: true
            };
        case (AuthActionTypes.LOGOUT):
            return {
                ...state,
                token: null,
                isAuthenticated: false
            };
        case (AuthActionTypes.SET_TOKEN):
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}
