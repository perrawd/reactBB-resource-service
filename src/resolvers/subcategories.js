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
        const subcategory = Subcategory.findOne({ _id: args.id })
        // const category = Subcategory.findById(args.id)
        console.log((await subcategory).toObject())
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
     * Update category.
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
     * @returns {object} The object.
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
