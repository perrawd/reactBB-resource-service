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
        getThreadByID(id: ID!): Thread
        getPostByID(id: ID!): Post
    }

    type Mutation {
        addPost(title: String!, body: String!): Post!
        deletePost(id: ID!): UpdateResponse!
        addThread(title: String!, body: String!, subcategory: String): Thread!
    }

    type UpdateResponse {
    success: Boolean!
    message: String!
    }

    type Post @key(fields: "id") {
        id: ID!
        title: String!
        body: String!
        author: String!
    }

    type Category @key(fields: "id") {
        id: ID!
        title: String!
        subtitle: String!
        subcategories: [SubCategory]
        author: String!
    }

    type SubCategory @key(fields: "id") {
        id: ID!
        title: String!
        subtitle: String!
        threads: [Thread]
        author: String!
    }

    type Thread @key(fields: "id") {
        id: ID!
        title: String!
        body: String!
        subcategory: String!
        posts: [Post]
        author: String!
    }
`
export default typeDefs
