import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
// @ts-ignore
import { createTestApp } from './utils/test.app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { User } from '@/features/auth/entities/user.entity';

describe('BookCategoryAdminController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());

    const password = await argon2.hash('123');

    const adminResult = await dataSource.query(`
      INSERT INTO users ("fullName", "username", "password", "role")
      VALUES ('Solih Coder', 'solihcoder@gmail.com', '${password}', 'Admin')
      RETURNING *;
    `);
    const adminUser = adminResult[0];
    adminToken = jwt.sign({ id: adminUser.id, role: adminUser.role }, 'ForTheLoveOfGodDontUseThisInProduction', { expiresIn: '1h' });

    const userResult = await dataSource.query(`
      INSERT INTO users ("fullName", "username", "password", "role")
      VALUES ('kimdir', 'kimdir@gmail.com', '${password}', 'User')
      RETURNING *;
    `);
    const regularUser = userResult[0];
    userToken = jwt.sign({ id: regularUser.id, role: regularUser.role }, 'ForTheLoveOfGodDontUseThisInProduction', { expiresIn: '1h' });
  });

  afterAll(async () => {
    await teardownTestApp(app, dataSource);
  });

  it('Should create a new BookCategory', async () => {
    await request(app.getHttpServer())
      .post('/category/create')
      .send({ title: 'Tarix' })
      .expect(401);
  });

  it('Should return 403', async () => {
    await request(app.getHttpServer())
      .post('/category/create')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: 'Tarix ' })
      .expect(403);
  });
})