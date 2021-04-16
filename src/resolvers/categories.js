/**
 * GraphQL categories resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { Category } from '../models/category.js'
import { Subcategory } from '../models/subcategory.js'
import { AuthenticationError } from 'apollo-server-express'

// Provide resolver functions for your schema fields
const categoryResolvers = {
  Query: {
  /**
   * Get all Threads.
   *
   * @returns {object} The server app.
   */
    async getCategory () {
      try {
        const posts = Category.find()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * Get a specific post.
     *
     * @param {object} _ parent.
     * @param {object} args object to search for.
     * @returns {object} The server app.
     */
    async getCategoryByID (_, args) {
      try {
        const category = Category.findById(args.id)
        return category
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
    addCategory: async (_, args, context) => {
      try {
        console.log('Category test')
        const user = authUser(context)
        const response = await Category.create({
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
     * @param {object} context object to create.
     * @returns {object} The object.
     */
    deleteCategory: async (_, args, context) => {
      try {
        const user = authUser(context)
        const thread = await Category.findOne({ _id: args.id })

        if (thread.author === user) {
          thread.remove()

          return {
            success: true,
            message: 'Thread deleted'
          }
        } else {
          throw new AuthenticationError('Action notallowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Category: {
    /**
     * Return object of sub-categories.
     *
     * @param {object} parent object to create.
     * @returns {object} The object.
     */
    subCategories: async (parent) => {
      try {
        console.log('Testing post array: ' + parent.id)
        const subCategories = await Subcategory.find()
        console.log(subCategories)
        return subCategories
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
    const authorization = context.req.headers.authorization.split(' ')
    const publicKey = fs.readFileSync(process.env.KEY_PATH, 'utf8')
    const payload = jwt.verify(authorization[1], publicKey)

    return payload.sub
  } catch (error) {
    throw new AuthenticationError(error)
  }
}

export default categoryResolvers
