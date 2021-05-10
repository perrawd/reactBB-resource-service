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
        getCategoryByID(id: ID!): Category
        getSubCategories: [SubCategory]
        getThreads: [Thread]
        getPosts: [Post]
        getThreadByID(id: ID!): Thread
        getPostByID(id: ID!): Post
        getSubCategoryByID(id: ID!): SubCategory
    }

    type Mutation {
        addCategory(title: String!, subtitle: String, author: String, subcategories: [ID]): Category!
        deleteCategory(id: ID!): UpdateResponse!
        addSubCategory(title: String!, subtitle: String, author: String, category: String, threads: String): UpdateResponse!
        deleteSubCategory(id: ID!): SubCategory!
        addThread(title: String!, subtitle: String, subcategory: String, posts: String): Thread
        deleteThread(id: ID!): UpdateResponse!
        addPost(body: String!, author: String!): Post!
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
        subtitle: String!
        subcategory: String!
        posts: [Post]
        author: String!
    }

    type Post @key(fields: "id") {
        id: ID!
        title: String
        body: String
        author: String
    }
`
export default typeDefs
