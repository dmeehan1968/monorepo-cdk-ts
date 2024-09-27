import { App } from 'aws-cdk-lib';
import { MyStack } from './MyStack.js'
import { Template } from 'aws-cdk-lib/assertions';
import * as cdkContext from '../../cdk.json'

describe('MyStack', () => {
  it('should have a test', () => {
    const app = new App({ context: { ...cdkContext, 'aws:cdk:bundling-stacks': [] }})
    const stack = new MyStack(app, 'MyStack')
    const template = Template.fromStack(stack)

    template.hasResource('AWS::Lambda::Function', {
      Properties: {
        Handler: 'index.handler',
        Runtime: 'nodejs20.x',
      }
    })
  })
});