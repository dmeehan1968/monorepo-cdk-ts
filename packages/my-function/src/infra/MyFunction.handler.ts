import middy from '@middy/core'

export const handler = middy()
  .handler(() => {
    console.log('Hello, world!')
  })
