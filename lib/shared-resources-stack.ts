import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { join } from "path";
import { aws_apigatewayv2 } from 'aws-cdk-lib';
import { aws_lambda } from 'aws-cdk-lib';
import { aws_lambda_nodejs } from 'aws-cdk-lib';
import { aws_logs } from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';

export class SharedResourcesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'SharedResourcesQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const lambda = new aws_lambda_nodejs.NodejsFunction(this, 'SharedResourcesHome', {
      entry: join(__dirname, './lambda/handler.js'),
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      handler: 'main',
      logRetention: aws_logs.RetentionDays.ONE_WEEK,
      timeout: Duration.minutes(1),
    });

    const api = new aws_apigatewayv2.HttpApi(this, 'SharedResourcesAPI', {
      disableExecuteApiEndpoint: true, // set to false to re-enable
    });
    const lambdaIntegration = new HttpLambdaIntegration('SharedResourcesIntegration', lambda);
    api.addRoutes({
      path: '/',
      methods: [ aws_apigatewayv2.HttpMethod.ANY ],
      integration: lambdaIntegration,
    });
  }
}
