/**
 * GraphQL Threads resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import fs from 'fs'
import jwt from 'jsonwebtoken'
import { Thread } from '../models/thread.js'
import { AuthenticationError } from 'apollo-server-express'

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
        const response = await Thread.create({
          ...args,
          author: user
        })
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
     * @param {object} parent object to create.
     * @returns {object} The object.
     */
    threads: async (parent) => {
      try {
        console.log('Testing threads array: ' + parent.id)
        const threads = await Thread.find()
        console.log(threads)
        return threads
      } catch (error) {
        console.error(error)
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

export default threadsResolvers
