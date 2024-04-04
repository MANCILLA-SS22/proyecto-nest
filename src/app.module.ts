import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

//Estos @ que estás viendo son llamados decoradores. El decorador es un elemento instaurado en Javascript y Typescript, cuya funcionalidad sigue la lógica del patrón de diseño decorador.
//Básicamente es una herencia, pero esta vez no es aplicada sólo a clases habituales, sino que también se aplican a funciones.
//Entendiendo este concepto, podemos decir que con el decorador @Module, estamos indicando que lo que se encuentra entre paréntesis será tratado como un módulo.

@Module({
  imports: [UsersModule], //imports: Son utilizados para obtener los módulos que requerimos como dependencias.
  controllers: [AppController], //controllers: Podemos entenderlo como los controladores que ya conocemos dentro del mundo de Express. Éstos consumirán los servicios que viajan desde los providers. La diferencia está en la función que cumple cada uno.
  providers: [AppService], //providers: Contienen la verdadera definición de lo que se declara por los controllers, es decir, contiene las operaciones reales que tienen el funcionamiento interno de la operación.
})
export class AppModule {}
