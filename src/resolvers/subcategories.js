/**
 * GraphQL SubCategories resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import authUser from '../utils/auth.js'
import { Subcategory } from '../models/subcategory.js'
import { Category } from '../models/category.js'
import { AuthenticationError } from 'apollo-server-express'

// Provide resolver functions for your schema fields
const subcategoryResolvers = {
  Query: {
  /**
   * Get all SubCategories.
   *
   * @returns {object} The server app.
   */
    async getSubCategories () {
      try {
        const subcategories = Subcategory.find()
        console.log(subcategories)
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
        const category = Subcategory.findOne({ _id: args.id })
        // const category = Subcategory.findById(args.id)
        console.log((await category).toObject())
        console.log((await category).toJSON().threadCount)
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
          author: user.id
        })

        await Category.findByIdAndUpdate(response.category,
          {
            $push: { subcategories: response._id }
          },
          { useFindAndModify: false }
        )

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

        if (thread.author === user.id) {
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
  Subcategory: {
    /**
     * Return object of threads.
     *
     * @param {object} subcategory the parent.
     * @returns {object} The object.
     */
    threads: async (subcategory) => {
      return (await subcategory.populate('threads').execPopulate()).threads
    },
    /**
     * Return object of threads.
     *
     * @param {object} subcategory the parent.
     * @returns {object} The object.
     */
    category: async (subcategory) => {
      return (await subcategory.populate('category').execPopulate()).category
    }
  }
}

export default subcategoryResolvers
