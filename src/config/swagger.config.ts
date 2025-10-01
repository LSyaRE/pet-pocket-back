import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Pet Pocket API')
    .setDescription('Veterinary management system API')
    .setVersion('0.1.0')
    .addTag('pet', 'pocket')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}
