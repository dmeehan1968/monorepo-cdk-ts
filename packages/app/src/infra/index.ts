import { App, AppProps } from "aws-cdk-lib"
import { MyStack } from "../stacks/MyStack.js"

export class MyApp extends App {
    constructor(props?: AppProps) {
        super(props)

        new MyStack(this, 'MyStack')
    }
}