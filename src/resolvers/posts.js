/**
 * GraphQL posts resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import { Post } from '../models/post.js'

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
  /**
   * The main function of the application.
   *
   * @returns {object} The server app.
   */
    async getPosts () {
      try {
        const posts = Post.find()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}

export default resolvers
