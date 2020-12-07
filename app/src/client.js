import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';

const host = "http://localhost:8080/graphql";

const httpLink = createHttpLink({
    uri: `${host}`,
  });

  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  defaultOptions
});

export default client;