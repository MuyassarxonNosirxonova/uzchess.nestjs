import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';

const TestDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.TEST_DB_URL,
  entities: ['./src/**/*.entity.ts'],
  synchronize: true,
  dropSchema: false,
  logging: false,
  invalidWhereValuesBehavior:{undefined:'ignore'}
};

export async function createTestDataSource() {
  const dataSource = new DataSource(TestDataSourceOptions);
  await dataSource.initialize();
  return dataSource;
}
