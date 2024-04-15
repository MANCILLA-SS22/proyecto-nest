import { Injectable } from '@nestjs/common';

// Las implementaciones de servicios que permitan traer información irán en la parte de service. Éste nos servirá para poder implementar múltiples operaciones y conectar con módulos de acceso a datos, para pasarlos al controlador.
// El return que podemos ver en el método getHello, pasa el dato al controlador para que éste responda al cliente.
@Injectable()
class AppService {
  getHello(): string {
    return 'Hola mundo';
  }
}

export { AppService };
