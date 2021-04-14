/**
 * GraphQL schema.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import { gql } from 'apollo-server-express'

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    extend type Query {
        getPosts: [Post]
        getThreads: [Thread]
        getPostByID(id: ID!): Post
    }

    type Mutation {
        addPost(title: String!, body: String!): Post!
        deletePost(id: ID!): UpdateResponse!
        addThread(title: String!, body: String!): Thread!
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

    type Thread @key(fields: "title") {
        title: String!
        body: String!
        author: String!
    }
`
export default typeDefs
