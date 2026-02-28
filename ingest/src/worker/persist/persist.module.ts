import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { createQueueProvider } from '../../../libs/sqs/queue.factory';
import { SOCIAL_QUEUE } from '../../../libs/sqs/queue.tokens';
import { SqsClientService } from '../../../libs/sqs/sqs.client';
import { SqsModule } from '../../../libs/sqs/sqs.module';
import { dataBaseConfig } from '../../config/database/database.config';
import { PersistService } from './persist.service';

@Module({
  imports: [SqsModule, SequelizeModule.forRoot(dataBaseConfig)],
  providers: [
    PersistService,
    createQueueProvider(SOCIAL_QUEUE, 'SOCIAL_QUEUE_URL'),
    SqsClientService,
  ],
})
export class PersistModule {}
