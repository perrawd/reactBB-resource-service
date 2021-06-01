/**
 * GraphQL SubCategories resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import authUser from '../utils/auth.js'
import { Subcategory } from '../models/subcategory.js'
import { Category } from '../models/category.js'

// Provide resolver functions for your schema fields
const subcategoryResolvers = {
  Query: {
  /**
   * Get all SubCategories.
   *
   * @returns {object} Subcategory document.
   */
    async getSubCategories () {
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
     * @returns {object} Subcategory document.
     */
    async getSubCategoryByID (_, args) {
      try {
        const subcategory = Subcategory.findOne({ _id: args.id })

        return subcategory
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
   * @returns {object} Response object.
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
        throw new Error(err)
      }
    },
    /**
     * Update SubCategory.
     *
     * @param {object} _ parent.
     * @param {object} args arguments.
     * @param {object} context context.
     * @returns {object} Response object.
     */
    editSubcategory: async (_, args, context) => {
      try {
        authUser(context)
        await Subcategory.updateOne(
          { _id: args.id },
          {
            ...args
          })

        return {
          success: true,
          message: 'Subcategory updated'
        }
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
     * @returns {object} Response object.
     */
    deleteSubcategory: async (_, args, context) => {
      try {
        authUser(context)
        const subcategory = await Subcategory.findOne({ _id: args.id })

        subcategory.remove()

        return {
          success: true,
          message: 'SubCategory deleted'
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Subcategory: {
    /**
     * Populates the threads field in the Subcategory model.
     *
     * @param {object} subcategory the Subcategory model.
     * @returns {object} the populated field.
     */
    threads: async (subcategory) => {
      return (await subcategory.populate('threads').execPopulate()).threads
    },
    /**
     * Populates the category field in the Subcategory model.
     *
     * @param {object} subcategory the Subcategory model.
     * @returns {object} the pupulated field.
     */
    category: async (subcategory) => {
      return (await subcategory.populate('category').execPopulate()).category
    }
  }
}

export default subcategoryResolvers
