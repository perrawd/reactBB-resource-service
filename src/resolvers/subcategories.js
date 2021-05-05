/**
 * GraphQL SubCategories resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { Subcategory } from '../models/subcategory.js'
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
        const subcategories = Subcategory.find()
        return subcategories
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
        await Subcategory.create({
          ...args,
          author: user
        })
        return {
          success: true,
          message: 'Subcategory added'
        }
      } catch (err) {
        console.error(err)
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
            message: 'SubCategory deleted'
          }
        } else {
          throw new AuthenticationError('Actionnotallowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  /**
   * Return object of sub-categories.
   *
   * @param {object} parent parent.
   * @returns {object} The object.
   */
  subCategories: async (parent) => {
    try {
      // const subCategories = await SubCategory.find()
      // return subCategories
    } catch (error) {
      console.error(error)
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
    console.error(error)
    throw new AuthenticationError(error)
  }
}

export default subcategoryResolvers
