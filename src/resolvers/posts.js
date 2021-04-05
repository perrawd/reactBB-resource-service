/**
 * GraphQL posts resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import fs from 'fs'
import jwt from 'jsonwebtoken'
import { Post } from '../models/post.js'
import { AuthenticationError } from 'apollo-server-express'

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
   * @param {object} context object to create.
   * @returns {object} The object.
   */
    addPost: async (_, args, context) => {
      try {
        const user = authUser(context)
        const response = await Post.create({
          ...args,
          author: user
        })
        return response
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * Delete post.
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

/**
 * Auth user.
 *
 * @param {object} context the context.
 * @returns {object} The user.
 */
const authUser = (context) => {
  try {
    const authorization = context.req.headers.authorization?.split(' ')
    const publicKey = fs.readFileSync(process.env.KEY_PATH, 'utf8')
    const payload = jwt.verify(authorization[1], publicKey)

    return payload.sub
  } catch (error) {
    throw new AuthenticationError(error)
  }
}

export default resolvers
