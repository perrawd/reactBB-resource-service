/**
 * The starting point of the application.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import express from 'express'
import helmet from 'helmet'
import { ApolloServer, gql } from 'apollo-server-express'

/**
 * The main function of the application.
 *
 * @returns {object} The server app.
 */
const main = async () => {
// Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
    hello: String
    }
    `

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
    /**
     * The main function of the application.
     *
     * @returns {object} The server app.
     */
      hello: () => 'Hello world!'
    }
  }

  const server = new ApolloServer({ typeDefs, resolvers, playground: true, introspection: true })
  await server.start()

  const app = express()
  app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }))
  server.applyMiddleware({ app })

  await new Promise(resolve => app.listen({ port: `${process.env.PORT}` }, resolve))
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  return { server, app }
}

main().catch(console.error)
