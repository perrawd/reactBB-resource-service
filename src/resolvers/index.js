import postResolvers from './posts.js'
import threadsResolvers from './threads.js'

const resolvers = {
  Query: {
    ...postResolvers.Query,
    ...threadsResolvers.Query
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...threadsResolvers.Mutation
  },
  Thread: {
    ...threadsResolvers.Thread
  }
}

export default resolvers
