import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseTestConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  logging: false,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_TEST_PORT || ''),
  username: process.env.DB_TEST_USERNAME,
  password: process.env.DB_TEST_PASSWORD,
  database: process.env.DB_TEST_NAME,
  autoLoadModels: true,
  synchronize: true,
  models: [],
};
