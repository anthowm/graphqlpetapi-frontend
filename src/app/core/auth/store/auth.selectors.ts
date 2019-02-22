import { createSelector } from '@ngrx/store';

import { AuthState } from './auth.models';
import { selectAuthState } from '@app/core/core.state';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
