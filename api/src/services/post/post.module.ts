import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SqsService } from '../sqs/sqs.service';

@Module({
  controllers: [PostController],
  providers: [PostService, SqsService],
})
export class PostModule {}
