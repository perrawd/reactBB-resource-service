/**
 * GraphQL posts resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import authUser from '../utils/auth.js'
import { Post } from '../models/post.js'
import { Thread } from '../models/thread.js'
import { AuthenticationError } from 'apollo-server-express'

// Provide resolver functions for your schema fields
const postResolvers = {
  Query: {
  /**
   * Get all posts.
   *
   * @returns {object} the posts.
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
     * Get a specific post.
     *
     * @param {object} _ parent.
     * @param {object} args arguments.
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
   * @param {object} args arguments.
   * @param {object} context context.
   * @returns {object} The created post.
   */
    addPost: async (_, args, context) => {
      try {
        const user = authUser(context)
        const response = await Post.create({
          ...args,
          author: user
        })

        await Thread.findByIdAndUpdate(response.thread,
          {
            $push: { posts: response._id }
          },
          { useFindAndModify: false }
        )

        return response
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * Delete post.
     *
     * @param {object} _ parent.
     * @param {object} args arguments.
     * @param {object} context context.
     * @returns {object} a response.
     */
    deletePost: async (_, args, context) => {
      try {
        const user = authUser(context)
        const post = await Post.findOne({ _id: args.id })

        if (post.author === user) {
          post.remove()

          return {
            success: true,
            message: 'Post deleted'
          }
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}

export default postResolvers
