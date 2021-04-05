/**
 * GraphQL schema.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import { gql } from 'apollo-server-express'

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        getPosts: [Post]
        getPostByID(id: ID!): Post
    }

    type Mutation {
        addPost(title: String!, body: String!): Post!
        deletePost(id: ID!): UpdateResponse
    }

    type UpdateResponse {
    success: Boolean!
    message: String
    }

    type Post {
        title: String
        body: String
        author: String
    }
`
export default typeDefs
