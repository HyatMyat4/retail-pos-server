import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 'log', 'verbose'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
