import { Construct } from "constructs"
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs"

export class MyFunction extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id)

    new NodejsFunction(this, 'Default', {
      entry: import.meta.resolve('./my-function.handler.ts').replace(/file:\/\//i, ''),
      bundling: {
        format: OutputFormat.ESM,
      }
    })
  }
}