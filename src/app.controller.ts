import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//Para establecer rutas nos fijamos en el docmento controlador (aqui mismo) y dentro de los decoradores colocamos el nomnre de los endpoints pero entre comillas.

@Controller('saludo')
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getHello(): string {
    return this.appService.getHello();
  }
}

export { AppController };
