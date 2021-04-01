/**
 * GraphQL posts resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import { Post } from '../models/post.js'

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
  /**
   * The main function of the application.
   *
   * @returns {object} The server app.
   */
    async getPosts () {
      try {
        const posts = Post.find()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * The main function of the application.
     *
     * @param {object} _ parent.
     * @param {object} args object to search for.
     * @returns {object} The server app.
     */
    async getPostByID (_, args) {
      try {
        const posts = Post.findById(args.id)
        return posts
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
  /**
   * Add post.
   *
   * @param {object} _ parent.
   * @param {object} args object to create.
   * @returns {object} The object.
   */
    addPost: async (_, args) => {
      try {
        const response = await Post.create(args)
        return response
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
   * Add post.
   *
   * @param {object} _ parent.
   * @param {object} args object to create.
   * @returns {object} The object.
   */
    deletePost: async (_, args) => {
      try {
        const post = await Post.findOne({ _id: args.id })
        post.remove()

        return {
          success: true,
          message: 'Post deleted'
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}

export default resolvers
