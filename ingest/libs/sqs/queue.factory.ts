import type { Provider } from '@nestjs/common';

import type { QueueConsumer, QueueProducer } from './queue.types';
import { SqsClientService } from './sqs.client';

export function createQueueProvider(token: symbol, queueUrlEnv: string): Provider {
  return {
    provide: token,
    inject: [SqsClientService],
    useFactory: (client: SqsClientService): QueueConsumer & QueueProducer => {
      const queueUrl = process.env[queueUrlEnv];

      if (!queueUrl) {
        throw new Error(`Missing env ${queueUrlEnv}`);
      }

      return {
        receive: () => client.receive(queueUrl),
        delete: (receiptHandle: string) => client.delete(queueUrl, receiptHandle),
        send: (payload: unknown) => client.send(queueUrl, payload),
      };
    },
  };
}
