import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DataFetchProvider from './components/DataFetchProvider.jsx'
//import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

/* const client = new ApolloClient({
  uri: "http://localhost:4000",//use 'uri' for the GraphQL server endpoint
  cache: new InMemoryCache(),
   
}); */
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <DataFetchProvider>
    <App />
    </DataFetchProvider>
  </StrictMode>,
)
