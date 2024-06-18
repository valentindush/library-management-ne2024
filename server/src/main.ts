import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()) //VALIDATION PIPES

  //SWAGGER UI CONFIG
  const config = new DocumentBuilder()
    .setTitle('Library Management System')
    .setDescription('Library Management System NE 2024')
    .setContact(
      "Valentin Dushime",
      "https://dushval.vercel.app",
      "codesvalentin@gmail.com"
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL [localhost in this case]
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  }))
  await app.listen(3000); //PORT
}
bootstrap();
