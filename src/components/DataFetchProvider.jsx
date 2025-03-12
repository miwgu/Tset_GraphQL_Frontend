import React, {createContext, useContext} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: "http://localhost:4000",//use 'uri' for the GraphQL server endpoint
    cache: new InMemoryCache(),
     
  });

  // Define GraphQL Queries
  const GET_BOOKS = gql`
  query GetBooks{
   books {
     id
     title
     author
   }
 }
 `;

 const DataFetchContext = createContext();

 export const useDataFetch = () =>{
    return useContext(DataFetchContext);
 };

 const DataFetchProvider = ({children}) =>{

    const useGetBooks = () => useQuery(GET_BOOKS);

    return (
        <DataFetchContext.Provider value ={{useGetBooks}}>
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </DataFetchContext.Provider>
    )

 };
 export default DataFetchProvider;