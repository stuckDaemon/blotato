import { Module } from '@nestjs/common';
import { dataBaseConfig } from './config/database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostModule } from './services/post/post.module';
import { SqsService } from './services/sqs/sqs.service';

@Module({
  imports: [SequelizeModule.forRoot(dataBaseConfig), PostModule],
  controllers: [],
  providers: [SqsService],
})
export class AppModule {}
