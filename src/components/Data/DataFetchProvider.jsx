import React, { createContext, useContext } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP link for GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include', // important if you're using cookies
});

// Add auth header with token from localStorage
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Apollo Client setup with auth
const client = new ApolloClient({
  link: authLink.concat(httpLink), // attach authLink to httpLink
  cache: new InMemoryCache(),
});

// GraphQL Query
const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

const GET_USERS = gql`
  query Users {
    users {
      id
      username
      email
      role
      favorites {
        id
        title
        author
      }
    }
  }
`;

const DataFetchContext = createContext();

export const useDataFetch = () => useContext(DataFetchContext);

const DataFetchProvider = ({ children }) => {
  const useGetBooks = () => useQuery(GET_BOOKS);
  const useGetUsers = () => useQuery(GET_USERS);

  return (
    <ApolloProvider client={client}>
      <DataFetchContext.Provider value={{ useGetBooks, useGetUsers }}>
        {children}
      </DataFetchContext.Provider>
    </ApolloProvider>
  );
};

export default DataFetchProvider;