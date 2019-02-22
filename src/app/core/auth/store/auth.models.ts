import { AppState } from '@app/core/core.state';

export interface AuthState {
  token: string;
  isAuthenticated: boolean;
}
