/**
 * GraphQL Threads resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import authUser from '../utils/auth.js'
import { Thread } from '../models/thread.js'
import { AuthenticationError } from 'apollo-server-express'
import { Subcategory } from '../models/subcategory.js'

// Provide resolver functions for your schema fields
const threadsResolvers = {
  Query: {
  /**
   * Get all Threads.
   *
   * @returns {object} The server app.
   */
    async getThreads () {
      try {
        const threads = Thread.find()
        return threads
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * Get a specific thread.
     *
     * @param {object} _ parent.
     * @param {object} args object to search for.
     * @returns {object} The server app.
     */
    async getThreadByID (_, args) {
      try {
        const thread = Thread.findById(args.id)
        return thread
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
  /**
   * Add Thread.
   *
   * @param {object} _ parent.
   * @param {object} args object to create.
   * @param {object} context object to create.
   * @returns {object} The object.
   */
    addThread: async (_, args, context) => {
      try {
        console.log('thread test')
        const user = authUser(context)
        console.log(user)
        const response = await Thread.create({
          ...args,
          author: user.username
        })
        await Subcategory.findByIdAndUpdate(response.subcategory,
          {
            $push: { threads: response._id }
          },
          { useFindAndModify: false }
        )

        return response
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * Delete Thread.
     *
     * @param {object} _ parent.
     * @param {object} args object to create.
     * @param {object} context object to create.
     * @returns {object} The object.
     */
    deleteThread: async (_, args, context) => {
      try {
        const user = authUser(context)
        const thread = await Thread.findOne({ _id: args.id })

        if (thread.author === user) {
          thread.remove()

          return {
            success: true,
            message: 'Thread deleted'
          }
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Thread: {
    /**
     * Return object of threads.
     *
     * @param {object} thread the parent.
     * @returns {object} The object.
     */
    subcategory: async (thread) => {
      return (await thread.populate('subcategory').execPopulate()).subcategory
    },
    /**
     * Return object of threads.
     *
     * @param {object} thread the parent.
     * @returns {object} The object.
     */
    posts: async (thread) => {
      return (await thread.populate('posts').execPopulate()).posts
    }
  }
}

export default threadsResolvers
