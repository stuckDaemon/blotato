import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreatePostDto } from './dto/create-post.dto';
import { SqsService } from '../sqs/sqs.service';
import { Post } from '../../models/post';

@Injectable()
export class PostService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly sqsService: SqsService,
  ) {}

  async publish(dto: CreatePostDto) {
    const [result] = await this.sequelize.query(
      "SELECT nextval('global_post_sequence') as sequenceId;",
    );

    const sequenceId = (result as any)[0].sequenceid ?? (result as any)[0].sequenceId;

    const message = {
      sequenceId: sequenceId,
      userId: dto.userId,
      platform: dto.platform,
      content: dto.content,
      desiredTime: dto.desiredTime,
    };

    await this.sqsService.sendMessage(message);

    return {
      sequenceId: sequenceId,
      desiredTime: dto.desiredTime,
    };
  }

  async findById(id: string) {
    return Post.findByPk(id);
  }
}
