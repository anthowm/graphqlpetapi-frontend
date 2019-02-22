import { onError } from 'apollo-link-error';
import { ErrorHandler } from '@angular/core';

function createErrorLink(errorHandle: ErrorHandler) {
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward, response }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        errorHandle.handleError(message);
      }
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });
  return errorLink;
}



export { createErrorLink };
