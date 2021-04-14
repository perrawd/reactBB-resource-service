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
  }
}

export default resolvers
