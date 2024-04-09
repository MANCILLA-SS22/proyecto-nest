import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserShema } from './schema/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([ //MongooseModule ya es un módulo incluido en la dependencia de nestjs/mongoose. Necesita que especifiquemos todos los modelos que vamos a usar.
    {
      // Luego, muy similar a un collection, schema, que aplicábamos para generar nuestros modelos demongoose en Express, mandamos el name y el schema generado del archivo de users.schema previo.
      //Ahora todo el módulo de usuarios sabe cómo utilizar Usuarios generados por mongoose. El resto es aplicarlo en los servicios. 
      name: UserModel.name,
      schema: UserShema
    }
  ]), ConfigModule], //para que un módulo funcione para otros módulos, basta con importar el módulo en el arreglo de imports del module.
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {};
