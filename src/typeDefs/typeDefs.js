/**
 * GraphQL schema.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import { gql } from 'apollo-server-express'

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
type Query {
hello: String
}
`
