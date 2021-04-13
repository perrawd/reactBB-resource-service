
const { ApolloServer, gql } = require('apollo-server-express')
const { buildFederatedSchema } = require('@apollo/federation')
const { createTestClient } = require('apollo-server-testing')
const typeDefs = require('../src/typeDefs/typeDefs.js')
const resolvers = require('../src/resolvers/posts.js')
const { expect, test } = require('@jest/globals')
const connectDB = require('../src/config/mongoose.js')
/*
import { ApolloServer, gql } from 'apollo-server-express'
import { buildFederatedSchema } from '@apollo/federation'
// import { setupServer } from 'msw/node'
import { createTestClient } from 'apollo-server-testing'
import { expect, test } from '@jest/globals'
import typeDefs from '../src/typeDefs/typeDefs.js'
import resolvers from '../src/resolvers/posts.js'
*/

test('test register account', async () => {
  await connectDB()
  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
  })
  const { query } = createTestClient(server)

  const { data } = await query({
    query: gql`
  {
    getPostByID(id:"60734e0318b14a0cc497d012"){
  title
  body
}
  }
`
  }
  )
  expect(data).toEqual({
    data: {
      getPostByID: {
        title: 'Test title ',
        body: 'Test post'
      }
    }
  })
})
