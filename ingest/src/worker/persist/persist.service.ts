import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { SOCIAL_QUEUE } from '../../../libs/sqs/queue.tokens';
import type { QueueConsumer } from '../../../libs/sqs/queue.types';
import { Post } from '../../models/post';
import { PostMessage } from './persist.interfaces';

@Injectable()
export class PersistService implements OnModuleInit, OnModuleDestroy {
  private running = true;

  constructor(
    @Inject(SOCIAL_QUEUE)
    private readonly socialQueue: QueueConsumer,

    private readonly sequelize: Sequelize,
  ) {}

  async onModuleInit(): Promise<void> {
    void this.poll();
  }

  onModuleDestroy(): void {
    this.running = false;
  }

  private async poll(): Promise<void> {
    while (this.running) {
      const messages = await this.socialQueue.receive();
      if (!messages.length) continue;

      for (const message of messages) {
        try {
          await this.processMessage(message.Body!);
          await this.socialQueue.delete(message.ReceiptHandle!);
        } catch (error) {
          console.error('[persist] failed', error);
        }
      }
    }
  }

  private parseMessage(body: string): PostMessage {
    const parsed = JSON.parse(body);
    if (!parsed.sequenceId) {
      throw new Error('Invalid message: missing sequenceId');
    }

    return parsed;
  }

  private async processMessage(body: string): Promise<void> {
    const payload = this.parseMessage(body);

    await this.persistPost(payload);

    console.log(`[persist] stored sequence ${payload.sequenceId}`);
  }

  private async persistPost(payload: PostMessage): Promise<void> {
    await this.sequelize.transaction(async (tx) => {
      await Post.create(
        {
          sequenceId: payload.sequenceId,
          userId: payload.userId,
          platform: payload.platform,
          content: payload.content,
          desiredTime: new Date(payload.desiredTime),
          status: 'PUBLISHED',
          publishedAt: new Date(),
        },
        { transaction: tx },
      );
    });
  }
}
