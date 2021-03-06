/**
 * GraphQL schema.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import { gql } from 'apollo-server-express'

/*
 * Constructs a GraphQL schema.
 */
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
        editCategory(id: ID!, title: String, subtitle: String): UpdateResponse!
        deleteCategory(id: ID!): UpdateResponse!
        addSubCategory(title: String!, subtitle: String, author: String, category: ID, threads: String): UpdateResponse!
        editSubcategory(id: ID!, title: String, subtitle: String): UpdateResponse!
        deleteSubcategory(id: ID!): UpdateResponse!
        addThread(title: String!, subtitle: String, subcategory: String, posts: String): Thread
        deleteThread(id: ID!): UpdateResponse!
        addPost(body: String!, author: String, thread: String, replyto: ID): Post!
        addLikes(id: ID!): UpdateResponse!
        editPost(id: ID!, body: String!, thread: String, isEdited: Boolean): UpdateResponse!
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
        createdAt: String
        updatedAt: String
    }

    type SubCategory @key(fields: "id") {
        id: ID!
        title: String!
        subtitle: String!
        category: Category
        threads: [Thread]
        threadCount: Int
        latest: Thread
        author: String!
        createdAt: String
        updatedAt: String
    }

    type Thread @key(fields: "id") {
        id: ID!
        title: String!
        subtitle: String!
        subcategory: SubCategory
        posts: [Post]
        postCount: Int
        author: String!
        createdAt: String
        updatedAt: String
    }

    type Post @key(fields: "id") {
        id: ID!
        title: String
        body: String
        author: String
        thread: Thread
        replyto: Post
        replies: Int
        likes: [Like]
        isEdited: Boolean
        createdAt: String
        updatedAt: String
    }

    type Like @key(fields: "id") {
        id: ID!
        username: String
        createdAt: String
    }
`
export default typeDefs
