import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '7703',
  database: 'uzchess',
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
};
