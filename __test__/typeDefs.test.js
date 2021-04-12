import { test, expect } from '@jest/globals'
import { gql } from 'apollo-server-express'
import typeDefs from '../src/typeDefs/typeDefs.js'

test('Check if typeDefs has correct fields', () => {
  expect(typeDefs).toBe(
    gql`
    extend type Query {
        getPosts: [Post]
        getPostByID(id: ID!): Post
    }

    type Mutation {
        addPost(title: String!, body: String!): Post!
        deletePost(id: ID!): UpdateResponse!
    }

    type UpdateResponse {
    success: Boolean!
    message: String!
    }

    type Post @key(fields: "title") {
        title: String!
        body: String!
        author: String!
    }
`
  )
})
