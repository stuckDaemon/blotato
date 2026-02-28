import { Module } from '@nestjs/common';
import { SqsClientService } from './sqs.client';

@Module({
  providers: [SqsClientService],
  exports: [SqsClientService],
})
export class SqsModule {}
