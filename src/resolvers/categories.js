/**
 * GraphQL categories resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { Category } from '../models/category.js'
import { AuthenticationError } from 'apollo-server-express'

// Provide resolver functions for your schema fields
const categoryResolvers = {
  Query: {
  /**
   * Get all Categories.
   *
   * @returns {object} The server app.
   */
    async getCategories () {
      try {
        const category = Category.find()
        return category
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * Get a specific Category by ID.
     *
     * @param {object} _ parent.
     * @param {object} args arguments.
     * @returns {object} the category.
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
   * Add Category.
   *
   * @param {object} _ parent.
   * @param {object} args arguments.
   * @param {object} context context.
   * @returns {object} object.
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
     * Delete Category.
     *
     * @param {object} _ parent.
     * @param {object} args arguments.
     * @param {object} context context.
     * @returns {object} The object.
     */
    deleteCategory: async (_, args, context) => {
      try {
        const user = authUser(context)
        const category = await Category.findOne({ _id: args.id })

        if (category.author === user) {
          category.remove()

          return {
            success: true,
            message: 'Category deleted'
          }
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Category: {
    /**
     * Return object of category.
     *
     * @param {object} parent parent.
     * @returns {object} The object.
     */
    Category: async (parent) => {
      try {
        const categories = await Category.find()
        return categories
      } catch (error) {
        console.error(error)
      }
    }
  }
}

/**
 * Auth.
 *
 * @param {object} context context.
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
