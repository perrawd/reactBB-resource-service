/**
 * GraphQL posts resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

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

export default resolvers
