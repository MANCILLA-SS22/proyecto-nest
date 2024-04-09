import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'; // "ConfigModule" se utiliza en los imports. "ConfigService" se injecta para usarse como servicio.
import FirstMiddleware from './middlewares/firstMiddleware';

//Estos @ que estás viendo son llamados decoradores. El decorador es un elemento instaurado en Javascript y Typescript, cuya funcionalidad sigue la lógica del patrón de diseño decorador. Básicamente es una herencia, pero esta vez no es 
//aplicada sólo a clases habituales, sino que también se aplican a funciones. Entendiendo este concepto, podemos decir que con el decorador @Module, estamos indicando que lo que se encuentra entre paréntesis será tratado como un módulo.
//imports: Son utilizados para obtener los módulos que requerimos como dependencias. 
//controllers: Podemos entenderlo como los controladores que ya conocemos dentro del mundo de Express. Éstos consumirán los servicios que viajan desde los providers. La diferencia está en la función que cumple cada uno.
//providers: Contienen la verdadera definición de lo que se declara por los controllers, es decir, contiene las operaciones reales que tienen el funcionamiento interno de la operación.
//"MongooseModule.forRoot" servirá para establecer la conexión desde el inicio de la aplicación.
//Se utiliza un ConfigModule.forRoot(), esto permite inicializar el contexto del módulo de configuración para que sea conocido y contemplado por el aplicativo principal y en los módulos internos. Luego, tenemos el cambio en MongooseModule, 
//donde esta vez estamos haciendo una inicialización dinámica. Nota cómo el configModule también se pasa al import de MongooseModule, así también como el ConfigService se inyecta para que pueda ser utilizado dentro de MongooseModule.
//Finalmente, tenemos un elemento useFactory, el cual es utilizado para crear un provider de manera dinámica, la razón de hacerlo así es que podremos inicializarlo ya tomando la url de conexión directamente de config.
//Config extiende de ConfigService, es por ello que aplicando un get podemos apreciar como se accede a una variable de entorno desde Nest. config.get<string>(‘Nombre de la variable’) buscará el archivo .env y tomará la variable con ese nombre, 
//en caso de no encontrarla, devolverá undefined. Solo queda colocar en el .env la string de conexión de mongo.
@Module({
  imports: [UsersModule, ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGO_URL')
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})

// Para que un módulo sea consciente de un middleware, es importante que éste cuente con un consumidor de Middleware, el cual es una funcionalidad interna del framework.
// Nuestro módulo AppModule, deberá implementar NestModule para que pueda utilizar de manera interna el configure, una función que permitirá setear el consumidor que queramos. 
// Al hacer consumer.apply, indicamos qué middleware será el que utilizaremos para fungir como intermediario de dicho módulo. Sin embargo, a diferencia de Express, éste nos solicita 
// indicar directamente cuáles serán las rutas que están autorizadas para utilizar dicho middleware
// Al colocar {path: ‘*’, method: RequestMethod.All} indicamos que este middleware funcionará para todas las rutas, para todos los métodos, siempre que necesitemos alguna ruta más específica, 
// o algún método más específico, podemos hacerlo en un objeto aparte.
class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes({path: "*", method: RequestMethod.ALL});
  }
}

export {AppModule};