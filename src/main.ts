import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .addBearerAuth()
    .addOAuth2()
    .setTitle('Task Management App')
    .setDescription('Task Management Backend APIs description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config );
  SwaggerModule.setup('api', app, document);
  const port = process.env
  
  .PORT || 3000;
  await app.listen(port);
  console.log(`Application listening on port ${port}`); // NOTE: Can use console.log over here
}
bootstrap();

