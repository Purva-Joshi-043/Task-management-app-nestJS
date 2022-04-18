import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import {Logger} from '@nestjs/common'

async function bootstrap() {
  const logger = new Logger(); // NOTE: while using logger make sure to pass a context
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // NOTE: use transform property
  app.useGlobalInterceptors(new TransformInterceptor()) // NOTE: use only when required, do not transform every response
  const port = 3000; // NOTE: use this, const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`) // NOTE: Can use console.log over here
}
bootstrap();
