import { handler } from './MyFunction.handler.js'
import { jest } from '@jest/globals'
import type { SpyInstance } from 'jest-mock'

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
    handler({})
    expect(consoleSpy).toHaveBeenCalledWith('Hello, world!')
  })

})