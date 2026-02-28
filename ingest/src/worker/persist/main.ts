import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { PersistModule } from './persist.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(PersistModule);
}
bootstrap();
