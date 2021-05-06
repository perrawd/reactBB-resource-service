/**
 * Endpoint for resolvers and mutations.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import categoryResolvers from './categories.js'
import subcategoryResolvers from './subcategories.js'
import threadsResolvers from './threads.js'
import postResolvers from './posts.js'

const resolvers = {
  Query: {
    ...categoryResolvers.Query,
    ...subcategoryResolvers.Query,
    ...threadsResolvers.Query,
    ...postResolvers.Query
  },
  Mutation: {
    ...categoryResolvers.Mutation,
    ...subcategoryResolvers.Mutation,
    ...threadsResolvers.Mutation,
    ...postResolvers.Mutation
  },
  Category: {
    ...categoryResolvers.Category
  },
  SubCategory: {
    ...subcategoryResolvers.threads
  },
  Thread: {
    ...threadsResolvers.Thread
  }
}

export default resolvers
