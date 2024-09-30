# @monorepo/jest-cdk-matchers

This package includes custom matchers for testing AWS CDK constructs.

## Usage

In your jest.config.js file, add the following:

```javascript
module.exports = {
  setupFilesAfterEnv: ['@monorepo/jest-cdk-matchers']
}
```

Create a `jest.setup.ts` file in the root of your project, and add the following:

```typescript
import '@monorepo/jest-cdk-matchers/types'
```

Now you can use the custom matchers in your tests:

```typescript
import { Template } from '@aws-cdk/assertions'
import { App } from 'aws-cdk-lib'

// A stack that your application creates
import { MyStack } from '../src/stack'

// A construct that your application creates
import { MyFunction } from '../src/my-function'

test('should work', () => {
  const app = new App()
  const stack = new Stack(app, 'TestStack')
  
  expect(stack).toHaveCdkChild(
    'MyFunction',   // the logical ID 
    MyFunction      // The construct class
  )
  
  const template = Template.fromStack(stack)

  expect(template).toHaveCdkResource('AWS::S3::Bucket', {
    // properties
  })
  expect(template).toHaveCdkLambda('MyFunction', {
    // properties
  })
})
```