import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const environment = configService.get<string>('NODE_ENV');
  await app.listen(PORT);
  logger.log(`${environment}, Serve start in PORT - ${PORT} Environment`);
}
bootstrap();
