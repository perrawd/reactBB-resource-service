/**
 * Auth util.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import fs from 'fs'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'

/**
 * Auth.
 *
 * @param {object} context context.
 * @returns {object} The user.
 */
const authUser = (context) => {
  try {
    const authorization = context.req.headers.authorization.split(' ')
    const publicKey = fs.readFileSync(process.env.KEY_PATH, 'utf8')
    const payload = jwt.verify(authorization[1], publicKey)

    return payload.sub
  } catch (error) {
    throw new AuthenticationError(error)
  }
}

export default authUser
