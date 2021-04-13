const { test, expect } = require('@jest/globals')
const { gql } = require('apollo-server-express')
const typeDefs = require('../src/typeDefs/typeDefs.js')

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
