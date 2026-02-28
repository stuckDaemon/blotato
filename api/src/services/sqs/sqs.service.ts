import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

@Injectable()
export class SqsService {
  private readonly client: SQSClient;
  private readonly queueUrl: string;

  constructor() {
    this.client = new SQSClient({
      region: 'us-east-1',
      endpoint: process.env.SQS_ENDPOINT,
      credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test',
      },
    });

    this.queueUrl = process.env.SQS_QUEUE_URL!;
  }

  async sendMessage(payload: unknown): Promise<void> {
    try {
      await this.client.send(
        new SendMessageCommand({
          QueueUrl: this.queueUrl,
          MessageBody: JSON.stringify(payload),
        }),
      );
    } catch (error) {
      console.log('Error sending message to SQS', error);
    }
  }
}
