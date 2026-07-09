import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type:'postgres',
  url:'postgresql://postgres:7703@localhost:5432/uzchess',
  synchronize:false,
  entities:['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js']
});

export default AppDataSource;