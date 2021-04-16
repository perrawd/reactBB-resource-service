import postResolvers from './posts.js'
import threadsResolvers from './threads.js'
import categoryResolvers from './categories.js'

const resolvers = {
  Query: {
    ...postResolvers.Query,
    ...threadsResolvers.Query,
    ...categoryResolvers.Query
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...threadsResolvers.Mutation,
    ...categoryResolvers.Mutation
  },
  Thread: {
    ...threadsResolvers.Thread
  }
}

export default resolvers
