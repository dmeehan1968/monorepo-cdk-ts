import { App } from "aws-cdk-lib"
import { MyStack } from "../stacks/index.js"

const app = new App()

new MyStack(app, 'MyStack')