import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('NE 2023 REST API')
    .setDescription('NE REST API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL you want to allow CORS for
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  }))
  await app.listen(3000);
}
bootstrap();
