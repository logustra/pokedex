import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ApolloProvider } from '@apollo/react-hooks'

import Store from './store'
import Routes from './router'

import { graphqlService } from '@/services'

import { PLayout } from 'templates'

import { GlobalStyleBase } from '@/styles'

const browserHistory = createBrowserHistory()

export default function App () {
  return (
    <ApolloProvider client={graphqlService}>
      <Store>
        <Router history={browserHistory}>
          <GlobalStyleBase />
          <PLayout>
            <Routes />
          </PLayout>
        </Router>
      </Store>
    </ApolloProvider>
  )
}
