import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  invalidWhereValuesBehavior: {undefined: 'ignore'},
};