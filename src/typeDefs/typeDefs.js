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
    }

    type Mutation {
        addPost(title: String!, body: String!, author: String!): Post!
    }

    type Post {
        title: String
        body: String
        author: String
    }
`
export default typeDefs
