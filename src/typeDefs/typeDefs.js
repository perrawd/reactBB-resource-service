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
        getCategories: [Category]
        getSubCategories: [SubCategory]
        getThreads: [Thread]
        getPosts: [Post]
        getThreadByID(id: ID!): Thread
        getPostByID(id: ID!): Post
        getSubCategoryByID(id: ID!): SubCategory
    }

    type Mutation {
        addCategory(title: String!, subtitle: String, author: String): Category!
        deleteCategory(id: ID!): UpdateResponse!
        addSubCategory(title: String!, subtitle: String, author: String): UpdateResponse!
        deleteSubCategory(id: ID!): SubCategory!
        addThread(title: String!, body: String!, subcategory: String): Thread!
        deleteThread(id: ID!): UpdateResponse!
        addPost(title: String!, body: String!): Post!
        deletePost(id: ID!): UpdateResponse!
    }

    type UpdateResponse {
        success: Boolean!
        message: String!
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

    type Post @key(fields: "id") {
        id: ID!
        title: String!
        body: String!
        author: String!
    }
`
export default typeDefs
