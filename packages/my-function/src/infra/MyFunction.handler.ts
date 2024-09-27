import middy from '@middy/core'

export const handler = middy()
  .handler((event: unknown) => {
    console.log('Hello, world!')
  })
