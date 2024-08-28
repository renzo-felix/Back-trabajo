import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  };
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Peru360 API')
    .setDescription('Documentación para el desarrollo de la API de Peru360')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const documentation = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentation);
  await app.listen(7091);
}
bootstrap();
