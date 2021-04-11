import { gql } from 'apollo-server-express'
// import { setupServer } from 'msw/node'
import { createTestClient } from 'apollo-server-testing'
import { expect, test } from '@jest/globals'
import { main } from './server.js'

test('test register account', async () => {
  const { query } = createTestClient(main)

  const { data } = await query({
    query: gql`
  {
    getPostByID(id:"607304481783e19278c710ca"){
  title
  body
}
  }
`
  }
  )
  expect(data).toEqual({
    data: {
      getPostByID: {
        title: 'Test title ',
        body: 'Test post'
      }
    }
  })
})
