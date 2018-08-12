// @flow

import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import apolloLogger from 'apollo-link-logger';
import { setContext } from 'apollo-link-context';
import createCache from './createCache';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const link = from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.warn(`[Network error]: ${networkError}`);
  }),
  ...(__DEV__ ? [apolloLogger] : []),
  authLink,
  new HttpLink({
    uri: '/graphql',
    credentials: 'include',
  }),
]);

const cache = createCache();

export default function createApolloClient() {
  return new ApolloClient({
    link,
    cache: cache.restore(window.App.apolloState),
    queryDeduplication: true,
    connectToDevTools: true,
  });
}
