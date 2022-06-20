import { createClient } from 'newt-client-js'

export const client = createClient({
  spaceUid: 'space-shunsuke',
  token: process.env.API_KEY || '',
  apiType: 'api',
})
