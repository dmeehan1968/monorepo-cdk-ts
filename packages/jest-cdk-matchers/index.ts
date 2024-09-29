import { Template } from 'aws-cdk-lib/assertions'
import { Stack } from 'aws-cdk-lib'

export function toHaveCdkResource(template: Template, resourceType: string, logicalIdPrefix: string, properties?: any) {
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

export function toHaveCdkLambda(template: Template, logicalIdPrefix: string, properties?: any) {
  return toHaveCdkResource(template, 'AWS::Lambda::Function', logicalIdPrefix, properties)
}

export function toHaveCdkChild(stack: Stack, logicalId: string, klass: new (...args: any[]) => any) {
  const child = stack.node.findChild(logicalId)
  const pass = child instanceof klass
  return {
    pass,
    message: () => `Expected stack ${pass ? 'not ' : ''}to have a child of type ${klass.name}`,
  }
}

expect.extend({
  toHaveCdkResource,
  toHaveCdkLambda,
  toHaveCdkChild,
})