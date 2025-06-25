import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as process from 'node:process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ подключаем PIPES до запуска сервера
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет поля, которых нет в DTO
      forbidNonWhitelisted: true, // выбрасывает ошибку, если лишние поля
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.ADMIN_SERVER, // замени на адрес фронта
    credentials: true, // если используешь куки или заголовки auth
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Start server ${process.env.PORT ?? 3000}`);
}
bootstrap(); // ✅ подключаем PIPES до запуска сервера
