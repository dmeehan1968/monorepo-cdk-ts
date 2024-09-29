import { App, Stack } from 'aws-cdk-lib';
import { MyStack } from './MyStack.js'
import * as cdkContext from '../../cdk.json'
import { MyFunction } from '@monorepo/my-function'

describe('MyStack', () => {

  let sut: Stack

  beforeAll(() => {
    const app = new App({ context: { ...cdkContext, 'aws:cdk:bundling-stacks': [] }})
    sut = new MyStack(app, 'MyStack')
  })

  it('should have a MyFunction construct', () => {
    expect(sut).toHaveCdkChild('MyFunction', MyFunction)
  })
});