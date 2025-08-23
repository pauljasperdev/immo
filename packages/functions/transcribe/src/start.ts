import {
  StartTranscriptionJobCommand,
  TranscribeClient,
} from '@aws-sdk/client-transcribe';
import type { S3Event } from 'aws-lambda';
import { Resource } from 'sst';

const transcribeClient = new TranscribeClient({ region: 'eu-central-1' });

// Helper function to sanitize job names for AWS Transcribe
function sanitizeJobName(name: string): string {
  return name
    .replace(/[^0-9a-zA-Z._-]/g, '_') // Replace invalid characters with underscores
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
}

export async function handler(event: S3Event) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));

  const mp4Records = event.Records.filter((record) =>
    record.s3.object.key.endsWith('.mp4')
  );

  console.log(`Found ${mp4Records.length} MP4 files to process`);

  const promises = mp4Records.map((record) => {
    const rawKey = record.s3.object.key;
    const inputKey = decodeURIComponent(rawKey.replace(/\+/g, ' '));

    console.log(
      `Processing file - Raw key: "${rawKey}", Decoded key: "${inputKey}"`
    );

    const fileName =
      inputKey.split('/').pop()?.replace('.mp4', '') || 'unknown';

    const timestamp = Date.now();
    const sanitizedFileName = sanitizeJobName(fileName);
    const jobName = `transcription-${sanitizedFileName}-${timestamp}`;

    // Use the raw key for the S3 URI to ensure it matches exactly what's in S3
    const mediaFileUri = `s3://${Resource.TranscriptionBucket.name}/${rawKey}`;

    // Put JSON result next to the MP4 file
    const directory = inputKey.includes('/')
      ? inputKey.substring(0, inputKey.lastIndexOf('/') + 1)
      : '';
    const outputKey = `${directory}${sanitizedFileName}.json`;

    console.log(`Transcription job details:
      Job Name: ${jobName}
      Media URI: ${mediaFileUri}
      Output Key: ${outputKey}`);

    return transcribeClient.send(
      new StartTranscriptionJobCommand({
        TranscriptionJobName: jobName,
        Media: { MediaFileUri: mediaFileUri },
        OutputBucketName: Resource.TranscriptionBucket.name,
        OutputKey: outputKey,
        LanguageCode: 'de-DE',
        MediaFormat: 'mp4',
      })
    );
  });

  await Promise.all(promises);

  return { statusCode: 200, body: 'Transcription jobs started' };
}
