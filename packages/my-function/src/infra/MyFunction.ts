import { Construct } from "constructs"
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs"
import { Runtime } from "aws-cdk-lib/aws-lambda"

export class MyFunction extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id)

    const fn = new NodejsFunction(this, 'Default', {
      entry: new URL('./MyFunction.handler.ts', import.meta.url).pathname,
      bundling: {
        format: OutputFormat.ESM,
      },
      runtime: Runtime.NODEJS_20_X,
    })
  }
}