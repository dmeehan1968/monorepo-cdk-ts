import { handler } from './MyFunction.handler.js'
import { jest } from '@jest/globals'
import type { SpyInstance } from 'jest-mock'
import { Context } from 'node:vm'

describe('MyFunction.handler', () => {

  let consoleSpy: SpyInstance

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {
    })
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('should log to console', async () => {
    await handler({}, {} as Context)
    expect(consoleSpy).toHaveBeenCalledWith('Hello, world!')
  })

})