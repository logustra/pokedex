import Http from './http'
import ApolloClient from 'apollo-boost'

export const httpService = new Http({
  baseURL: process.env.API_URL
})

export const graphqlService = new ApolloClient({
  uri: process.env.API_URL_GRAPHQL
})
