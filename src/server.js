/**
 * The starting point of the application.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import express from 'express'
import helmet from 'helmet'
import { ApolloServer } from 'apollo-server-express'
import depthLimit from 'graphql-depth-limit'
import { connectDB } from './config/mongoose.js'

import typeDefs from './typeDefs/typeDefs.js'
import resolvers from './resolvers/posts.js'

/**
 * The main function of the application.
 *
 * @returns {object} The server app.
 */
const main = async () => {
  await connectDB()
  // Start GraphQL Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    validationRules: [depthLimit(7)],
    /**
     * Access req and res in context.
     *
     * @param {object} args server app.
     * @param {object} args.req The request.
     * @param {object} args.res The res.
     * @returns {object} The req and res.
     */
    context: ({ req, res }) => ({ req, res })
  })
  await server.start()

  // Start Express server
  // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
  const app = express()
  app.use(helmet({
    contentSecurityPolicy: (process.env.NODE_ENV === 'production')
      ? undefined
      : false
  }))

  // Error handler.
  app.use(function (err, req, res, next) {
    err.status = err.status || 500

    if (req.app.get('env') !== 'development') {
      res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
      return
    }

    // Development only!
    // Only providing detailed error in development.
    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        innerException: err.innerException,
        stack: err.stack
      })
  })

  server.applyMiddleware({ app })

  await new Promise(resolve => app.listen({ port: `${process.env.PORT}` }, resolve))
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)

  return { server, app }
}

main().catch(console.error)
