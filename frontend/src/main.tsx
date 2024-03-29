import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App'
import './index.css'

const apiUrl = import.meta.env.VITE_API_BASE_URL as string + '/graphql'


const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache()
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
