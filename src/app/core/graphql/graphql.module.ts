import { NgModule, ErrorHandler } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import {
  InMemoryCache,
} from 'apollo-cache-inmemory';
import { uploadLink } from './middlewares/upload';
import { createAuthLink } from './middlewares/auth';
import { from } from 'apollo-link';
import { createErrorLink } from './middlewares/error';
import { FetchPolicy, ErrorPolicy } from 'apollo-client';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';



@NgModule({
  declarations: [],
  imports: [],
  exports: [ApolloModule, HttpLinkModule],
  providers: []
})
export class GraphqlModule {
  constructor(
    apollo: Apollo,
    errorHandle: ErrorHandler,
    store: Store<AppState>
  ) {
    const authLink = createAuthLink(store);
    const errorLink = createErrorLink(errorHandle);
    const noCache: FetchPolicy = 'no-cache';
    const allError: ErrorPolicy = 'all';
    const ignore: ErrorPolicy = 'ignore';
    const defaultOptions = {
      watchQuery: {
        fetchPolicy: noCache,
        errorPolicy: ignore
      },
      query: {
        fetchPolicy: noCache,
        errorPolicy: allError
      },
      mutate: {
        fetchPolicy: noCache,
        errorPolicy: allError
      }
    };
    apollo.create({
      link: from([authLink, errorLink, uploadLink]),
      cache: new InMemoryCache(),
      defaultOptions: defaultOptions
    });
  }
}
