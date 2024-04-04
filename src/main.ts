import { NestFactory } from '@nestjs/core'; //el método NestFactory crea el módulo principal a partir de un módulo. Este contendrá entonces las funcionalidades principales de nuestro aplicativo.
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5500);
}
bootstrap();
