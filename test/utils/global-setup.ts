import 'dotenv/config';
import { DataSource } from 'typeorm';

export default async function globalSetup() {
  const db = new DataSource({
    type: 'postgres',
    url:process.env.DEFAULT_DB_URL,
  });

  await db.initialize();

  const dbName = 'uzchess_test';

  await db.query(`DROP DATABASE IF EXISTS "${dbName}"`);

  await db.query(`CREATE DATABASE "${dbName}"`);

  await db.destroy();
}