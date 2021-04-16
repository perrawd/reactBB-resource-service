/**
 * GraphQL SubCategories resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { Subcategory } from '../models/subcategory.js'
import { Thread } from '../models/thread.js'
import { AuthenticationError } from 'apollo-server-express'

// Provide resolver functions for your schema fields
const subcategoryResolvers = {
  Query: {
  /**
   * Get all SubCategories.
   *
   * @returns {object} The server app.
   */
    async getSubCategory () {
      try {
        const posts = Subcategory.find()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * Get a specific SubCategory.
     *
     * @param {object} _ parent.
     * @param {object} args arguments.
     * @returns {object} The server app.
     */
    async getSubCategoryByID (_, args) {
      try {
        const category = Subcategory.findById(args.id)
        return category
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
  /**
   * Add SubCategory.
   *
   * @param {object} _ parent.
   * @param {object} args arguments.
   * @param {object} context context.
   * @returns {object} The object.
   */
    addSubCategory: async (_, args, context) => {
      try {
        const user = authUser(context)
        const response = await Subcategory.create({
          ...args,
          author: user
        })
        return response
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * Delete SubCategory.
     *
     * @param {object} _ parent.
     * @param {object} args arguments.
     * @param {object} context context.
     * @returns {object} The object.
     */
    deleteSubCategory: async (_, args, context) => {
      try {
        const user = authUser(context)
        const thread = await Subcategory.findOne({ _id: args.id })

        if (thread.author === user) {
          thread.remove()

          return {
            success: true,
            message: 'Thread deleted'
          }
        } else {
          throw new AuthenticationError('Actionnotallowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  SubCategory: {
    /**
     * Return object of sub-categories.
     *
     * @param {object} parent parent.
     * @returns {object} The object.
     */
    threads: async (parent) => {
      try {
        const threads = await Thread.find()
        return threads
      } catch (error) {
        console.error(error)
      }
    }
  }
}

/**
 * Auth category.
 *
 * @param {object} context the context.
 * @returns {object} The user.
 */
const authUser = (context) => {
  try {
    const authorization = context.req.headersauthorization.split(' ')
    const publicKey = fs.readFileSync(process.envKEY_PATH, 'utf8')
    const payload = jwt.verify(authorization[1], publicKey)

    return payload.sub
  } catch (error) {
    throw new AuthenticationError(error)
  }
}

export default subcategoryResolvers
