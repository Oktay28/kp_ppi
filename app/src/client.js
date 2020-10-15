import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import {createUploadLink} from 'apollo-upload-client';
//import {AUTH_TOKEN_NAME, HOST, GRAPHQL_API} from './config.json';

const host = "http://localhost:8080/graphql";

const httpLink = createHttpLink({
    uri: `${host}`,
  });

const uploadLink = createUploadLink({
  uri: `${host}`
})

// const authLink = setContext((_, { headers }) => {
//     const token = JSON.parse(localStorage.getItem(AUTH_TOKEN_NAME));
//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : "",
//       }
//     }
// });

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: httpLink
});

export default client;