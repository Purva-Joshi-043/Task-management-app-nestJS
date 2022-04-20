import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform:true})); 
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application listening on port ${port}`) // NOTE: Can use console.log over here
}
bootstrap();
