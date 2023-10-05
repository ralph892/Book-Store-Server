import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { QueryErrorFilter } from './QueryErrorFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new QueryErrorFilter(httpAdapter));
  await app.listen(8080);
}
bootstrap();
