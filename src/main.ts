import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // adding Global Prefix
  app.setGlobalPrefix('api');
  // adding Swagger
  const config = new DocumentBuilder()
    .setTitle('Cryptos APIs')
    .setDescription('Collective.Work - Technical Test using NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  // listening on port
  await app.listen(3000);
}

bootstrap();
