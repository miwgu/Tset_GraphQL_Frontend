import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  DataFetchProvider  from './components/Data/DataFetchProvider.jsx'
import { LocalHostLoginProvider } from './components/Login/LocalHostLoginProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
//import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

/* const client = new ApolloClient({
  uri: "http://localhost:4000",//use 'uri' for the GraphQL server endpoint
  cache: new InMemoryCache(),
   
}); */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <LocalHostLoginProvider>
      <DataFetchProvider>
       <App />
      </DataFetchProvider>
     </LocalHostLoginProvider>
    </BrowserRouter>
  </StrictMode>
)
