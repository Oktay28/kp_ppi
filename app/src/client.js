import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';

const host = "http://localhost:8080/graphql";

const httpLink = createHttpLink({
    uri: `${host}`,
  });

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: httpLink
});

export default client;