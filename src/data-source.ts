import 'dotenv/config'
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type:'postgres',
  url:process.env.DB_URL,
  synchronize:false,
  entities:['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js']
});

export default AppDataSource;