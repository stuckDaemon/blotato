import type { Message } from '@aws-sdk/client-sqs';

export interface QueueConsumer {
  receive(): Promise<Message[]>;
  delete(receiptHandle: string): Promise<void>;
}

export interface QueueProducer {
  send(payload: unknown): Promise<void>;
}
