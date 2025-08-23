import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  GetTranscriptionJobCommand,
  TranscribeClient,
} from '@aws-sdk/client-transcribe';

const transcribeClient = new TranscribeClient({ region: 'eu-central-1' });

interface EventBridgeEvent {
  detail: {
    TranscriptionJobName: string;
    TranscriptionJobStatus: string;
  };
}

export async function handler(event: EventBridgeEvent) {
  const jobName = event.detail.TranscriptionJobName;
  console.log(`DEBUG: Starting process for job: ${jobName}`);

  try {
    console.log('DEBUG: About to call GetTranscriptionJob');
    // Get job details to find the transcript URI
    const jobResult = await transcribeClient.send(
      new GetTranscriptionJobCommand({ TranscriptionJobName: jobName })
    );
    console.log('DEBUG: GetTranscriptionJob succeeded');

    // Debug: Check if this step works
    if (!jobResult.TranscriptionJob) {
      throw new Error('No transcription job found in response');
    }
    console.log(
      `DEBUG: Job status: ${jobResult.TranscriptionJob.TranscriptionJobStatus}`
    );

    const transcriptUri =
      jobResult.TranscriptionJob?.Transcript?.TranscriptFileUri;
    if (!transcriptUri) {
      throw new Error('No transcript URI found in job result');
    }
    console.log(`DEBUG: Found transcript URI: ${transcriptUri}`);

    // Parse S3 URI - handle both s3:// and https:// formats
    let bucketName: string;
    let objectKey: string;

    if (transcriptUri.startsWith('s3://')) {
      // Format: s3://bucket-name/path/to/file.json
      bucketName = transcriptUri.split('/')[2];
      objectKey = transcriptUri.split('/').slice(3).join('/');
    } else if (transcriptUri.startsWith('https://')) {
      // Format: https://s3.region.amazonaws.com/bucket-name/path/to/file.json
      const parts = transcriptUri.split('/');
      bucketName = parts[3]; // bucket is the 4th part
      objectKey = decodeURIComponent(parts.slice(4).join('/')); // decode URL encoding
    } else {
      throw new Error(`Unsupported transcript URI format: ${transcriptUri}`);
    }
    console.log(`DEBUG: Parsed bucket: ${bucketName}, key: ${objectKey}`);

    // Create S3 client that handles cross-region redirects automatically
    const s3Client = new S3Client({
      region: 'eu-central-1', // Hardcode to eu-central-1 as requested
      followRegionRedirects: true, // Handle cross-region requests automatically
    });
    console.log('DEBUG: Created S3 client');

    console.log('DEBUG: About to call GetObject');
    // Download transcript from S3
    const getObjectResponse = await s3Client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      })
    );
    console.log('DEBUG: GetObject succeeded');

    if (!getObjectResponse.Body) {
      throw new Error('No transcript data found in S3 object');
    }

    console.log('DEBUG: About to parse transcript JSON');
    // Convert stream to string and parse JSON with proper encoding
    const transcriptJson =
      await getObjectResponse.Body.transformToString('utf-8');
    const transcriptData = JSON.parse(transcriptJson);
    const transcriptText = transcriptData.results.transcripts[0].transcript;
    console.log(
      `DEBUG: Extracted transcript text (${transcriptText.length} chars)`
    );

    // Create TXT file next to the JSON file
    // Replace .json with .txt in the object key
    const txtKey = objectKey.replace('.json', '.txt');
    console.log(`DEBUG: Will write to key: ${txtKey}`);

    console.log('DEBUG: About to call PutObject');
    // Write .txt file to S3 next to the JSON with proper UTF-8 encoding
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: txtKey,
        Body: transcriptText,
        ContentType: 'text/plain; charset=utf-8',
        ContentEncoding: 'utf-8',
      })
    );
    console.log('DEBUG: PutObject succeeded');

    console.log('DEBUG: Function completed successfully');
    return { statusCode: 200, body: 'Transcript processed successfully' };
  } catch (error) {
    // More detailed error information
    throw new Error(
      `Failed at step: ${error instanceof Error ? error.message : 'Unknown error'} - Stack: ${error instanceof Error ? error.stack : 'No stack'}`
    );
  }
}
