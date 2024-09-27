import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import { MyFunction } from '@monorepo/my-function'

export class MyStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new MyFunction(this, 'MyFunction')
    }
}