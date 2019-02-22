import { setContext } from 'apollo-link-context';
import { GraphQLRequest } from 'apollo-link';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as AuthActions from '../../auth/store/auth.action';

function createAuthLink(store) {
  const authLink = setContext((operation: GraphQLRequest, prevContext: any) => {
    const jwt: any = localStorage.getItem('APP-AUTH') || '';
    if (!jwt) {
      return {};
    } else {
      const token: string = JSON.parse(jwt).token;
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if (isExpired) {
        store.dispatch(new AuthActions.Logout());
      } else {
        return {
          headers: { Authorization: `Bearer ${token}` }
        };
      }
    }
  });
  return authLink;
}

export { createAuthLink };
