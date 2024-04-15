import { NestFactory } from '@nestjs/core'; //El método NestFactory crea el módulo principal a partir de un módulo. Este contendrá entonces las funcionalidades principales de nuestro aplicativo.
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  await app.listen(5500);
}
bootstrap();
