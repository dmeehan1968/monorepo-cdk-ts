import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MyFunction } from './MyFunction.js'

describe('MyStack', () => {

  let sut: Template

  beforeAll(() => {
    const app = new App({ context: { 'aws:cdk:bundling-stacks': [] } })
    const stack = new Stack(app, 'Default')
    new MyFunction(stack, 'MyFunction')
    sut = Template.fromStack(stack)
  })

  it('should have a lambda', () => {
    sut.resourceCountIs('AWS::Lambda::Function', 1)
  })

  it('should use node 20', () => {
    sut.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs20.x',
    })
  })

  it('should use handler', () => {
    sut.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler',
    })
  })
});