import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
// @ts-ignore
import { createTestDataSource } from './test-database';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import morgan from 'morgan';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

export interface TestApp {
  app: INestApplication;
  dataSource: DataSource;
}

export async function createTestApp(): Promise<TestApp> {
  const dataSource = await createTestDataSource();
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(getDataSourceToken())
    .useValue(dataSource)
    .compile();

  const app = moduleFixture.createNestApplication<NestExpressApplication>();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


  app.use(morgan('dev'));

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  await app.init();
  return { app, dataSource };
}
