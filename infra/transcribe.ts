// biome-ignore-all lint: SST is globally available

import { isPermanentStage } from './utils';

// Create S3 bucket for audio files and transcription results
export const transcriptionBucket = isPermanentStage
  ? undefined
  : new sst.aws.Bucket('TranscriptionBucket', {
      public: false,
      policy: [
        {
          actions: ['s3:GetObject'],
          principals: [
            {
              type: 'service',
              identifiers: ['transcribe.amazonaws.com'],
            },
          ],
          paths: ['*'],
        },
      ],
    });

// Lambda 1: Start transcription job (triggered by S3 upload)
export const transcribeStartFunction = isPermanentStage
  ? undefined
  : new sst.aws.Function('TranscribeStartFunction', {
      handler: 'packages/functions/transcribe/src/start.handler',
      timeout: '1 minute', // Short timeout - just starts job
      memory: '512 MB',
      link: [transcriptionBucket],
      permissions: [
        {
          actions: ['s3:GetObject'],
          resources: [
            transcriptionBucket!.arn,
            $interpolate`${transcriptionBucket!.arn}/*`,
          ],
        },
        {
          actions: ['transcribe:StartTranscriptionJob'],
          resources: ['*'],
        },
      ],
    });

// Lambda 2: Process completed transcription (triggered by EventBridge)
export const transcribeProcessFunction = isPermanentStage
  ? undefined
  : new sst.aws.Function('TranscribeProcessFunction', {
      handler: 'packages/functions/transcribe/src/process.handler',
      timeout: '5 minutes',
      memory: '512 MB',
      link: [transcriptionBucket],
      permissions: [
        {
          actions: ['s3:*'], // Broad S3 permissions for development
          resources: ['*'],
        },
        {
          actions: ['transcribe:*'], // Broad Transcribe permissions for development
          resources: ['*'],
        },
      ],
    });

// EventBridge Rule: Listen for Transcribe job completion
export const transcribeCompletionRule = isPermanentStage
  ? undefined
  : new aws.cloudwatch.EventRule('TranscribeCompletionRule', {
      description: 'Trigger when Transcribe job completes',
      eventPattern: $jsonStringify({
        source: ['aws.transcribe'],
        'detail-type': ['Transcribe Job State Change'],
        detail: {
          TranscriptionJobStatus: ['COMPLETED'],
        },
      }),
    });

// EventBridge Target: Connect rule to Lambda 2
export const transcribeCompletionTarget = isPermanentStage
  ? undefined
  : new aws.cloudwatch.EventTarget('TranscribeCompletionTarget', {
      rule: transcribeCompletionRule!.name,
      arn: transcribeProcessFunction!.arn,
    });

// Permission: Allow EventBridge to invoke Lambda 2
export const transcribeCompletionPermission = isPermanentStage
  ? undefined
  : new aws.lambda.Permission('TranscribeCompletionPermission', {
      action: 'lambda:InvokeFunction',
      function: transcribeProcessFunction!.name,
      principal: 'events.amazonaws.com',
      sourceArn: transcribeCompletionRule!.arn,
    });

// S3 Notification: Trigger Lambda 1 on MP4 upload
transcriptionBucket?.notify({
  notifications: [
    {
      name: 'TranscribeStartAction',
      function: transcribeStartFunction!.arn,
      events: ['s3:ObjectCreated:*'],
      filterSuffix: '.mp4',
    },
  ],
});
