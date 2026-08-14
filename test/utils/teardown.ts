import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';

export async function teardownTestApp(app:INestApplication,dataSource:DataSource){
  await dataSource.dropDatabase();
  await dataSource.destroy()
  await app.close();
}