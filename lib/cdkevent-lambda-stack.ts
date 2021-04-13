import * as cdk from '@aws-cdk/core';
import * as events from '@aws-cdk/aws-events';
import * as lambda from '@aws-cdk/aws-lambda';
import { PythonFunction } from "@aws-cdk/aws-lambda-python";
import { LambdaFunction } from '@aws-cdk/aws-events-targets';

export class CdkeventLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const PREFIX_NAME = id.toLowerCase().replace('stack','')
    
    const lambda_function = new PythonFunction(this, "lambda_function", {
      entry: "lambda",
      index: "index.py",
      handler: "lambda_handler",
      functionName: PREFIX_NAME + "-function",
      runtime: lambda.Runtime.PYTHON_3_8,
    })
    
    const target = new LambdaFunction(lambda_function)

    const rule = new events.Rule(this, 'rule', {
     schedule: events.Schedule.rate(cdk.Duration.minutes(5)),
     targets: [target],
    })
  }
}
