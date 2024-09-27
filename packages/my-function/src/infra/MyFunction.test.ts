import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MyFunction } from './MyFunction.js'

function toHaveResource(template: Template, resourceType: string, logicalIdPrefix: string, properties?: any) {
  const resources = template.findResources(resourceType)
  const regex = new RegExp(`^${logicalIdPrefix}[0-9a-f]{8}$`, 'i')
  const logicalId = Object.keys(resources).find(k => regex.test(k))
  let pass = !!logicalId
  if (logicalId !== undefined && properties !== undefined) {
    pass = expect.objectContaining(properties).asymmetricMatch(resources[logicalId].Properties)
  }
  return {
    pass,
    message: () => pass
      ? `Did not expect to find resource with logical ID matching ${regex} in template`
      : `No ${resourceType} with logical ID matching ${regex} found in template`,
  }
}

function toHaveLambda(template: Template, logicalIdPrefix: string, properties?: any) {
  return toHaveResource(template, 'AWS::Lambda::Function', logicalIdPrefix, properties)
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveResource(resourceType: string, logicalIdPrefix: string, properties?: any): R
      toHaveLambda(logicalIdPrefix: string, properties?: any): R
    }
  }
}

expect.extend({ toHaveResource, toHaveLambda })

describe('MyStack', () => {

  let sut: Template

  beforeAll(() => {
    const app = new App({ context: { 'aws:cdk:bundling-stacks': [] } })
    const stack = new Stack(app, 'Default')
    new MyFunction(stack, 'MyFunction')
    sut = Template.fromStack(stack)
  })

  it('should have a lambda', () => {
    expect(sut).toHaveLambda('MyFunction', {
      Handler: 'index.handler',
      Runtime: 'nodejs20.x',
    })
  })
});