import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureSwagger } from '@core/configs/swagger.config';
import {NestExpressApplication} from "@nestjs/platform-express";
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {prefix: '/uploads/'});

  const uploadsPath = join(__dirname, '..', 'uploads');

  console.log("UPLOADS PATH:", uploadsPath);
  console.log("DIR:", __dirname);

  app.useStaticAssets(uploadsPath, {
    prefix: '/uploads/',
  });

  configureSwagger(app);
  await app.listen(8000);
}

bootstrap();
