import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from '@config/swagger.config';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerWithoutClass } from './shared/utils/logger-without-class';
import { AllExceptionsFilter } from '@config/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({}),
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const logger = LoggerWithoutClass.instance;

  app.setGlobalPrefix('pocket');

  app.useGlobalFilters(new AllExceptionsFilter());

  initSwagger(app);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(port ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Swagger is running on: ${await app.getUrl()}/api`);
}
bootstrap();
