import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async publish(@Body() dto: CreatePostDto) {
    const result = await this.postService.publish(dto);

    return {
      sequenceId: result.sequenceId,
      desiredTime: result.desiredTime,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postService.findById(id);
  }
}
