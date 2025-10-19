import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { join } from "path";
import { aws_lambda } from 'aws-cdk-lib';
import { aws_lambda_nodejs } from 'aws-cdk-lib';

export class SharedResourcesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'SharedResourcesQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const function = new aws-lambda-nodejs.NodejsFunction(this, "SharedResourcesHome", {
      entry: join(__dirname, '../index.js'),
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      logRetention: RetentionDays.ONE_WEEK,
    });
  }
}
