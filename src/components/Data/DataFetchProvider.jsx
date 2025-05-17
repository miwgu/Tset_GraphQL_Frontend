import React, { createContext, useContext } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
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
export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      thumbnailUrl
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

const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!,
    $author: String!,
    $isbn: String!,
    $category: String,
    $sensitiveNotes: String,
    $thumbnailUrl: String
  ) {
    createBook(
      title: $title,
      author: $author,
      isbn: $isbn,
      category: $category,
      sensitiveNotes: $sensitiveNotes,
      thumbnailUrl: $thumbnailUrl
    ) {
      id
      title
      author
      isbn
      category
      sensitiveNotes
      thumbnailUrl
    }
  }
`;


const DataFetchContext = createContext();

export const useDataFetch = () => useContext(DataFetchContext);

const DataFetchProvider = ({ children }) => {
  const useGetBooks = () => useQuery(GET_BOOKS);
  const useGetUsers = () => useQuery(GET_USERS);
  const useAddBook = () => useMutation(ADD_BOOK);

  return (
    <ApolloProvider client={client}>
      <DataFetchContext.Provider value={{ useGetBooks, useGetUsers, useAddBook }}>
        {children}
      </DataFetchContext.Provider>
    </ApolloProvider>
  );
};

export default DataFetchProvider;