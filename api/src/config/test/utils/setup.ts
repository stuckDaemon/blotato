import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseTestConfig } from '../database.test.config';

const models = [];
const providers = [];

export const buildTestModule = async (): Promise<TestingModule> => {
  return await Test.createTestingModule({
    imports: [
      SequelizeModule.forRoot(databaseTestConfig),
      SequelizeModule.forFeature(models),
    ],
    providers: providers,
  }).compile();
};
