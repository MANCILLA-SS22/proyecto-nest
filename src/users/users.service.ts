import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';

import { InjectModel } from '@nestjs/mongoose';
import { UserModel, UsersDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
class UsersService {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UsersDocument>){ //Creamos una nueva persistencia desde el constructor 
    // Como ya tenemos el contexto de quiénes son nuestros usuarios (contexto que pasamos desde el app.module). Sólo hacemos la inyección del nombre del modelo del usuario.
    // Luego, declararemos una variable (privada) que represente el modelo que vamos a utilizar en los servicios, nota que el modelo utiliza el tipo de dato UsersDocument que creamos en el archivo del schema    
  }

  async findAll() {
    return await this.userModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async create(createUserDto: CreateUserDto){
    // ahora podemos utilizar this.usersModel en cualquiera de nuestros archivos, y las operaciones de mongoose, a las que tanto estamos acostumbrados, permanecen idénticas.
    return await this.userModel.create(createUserDto)
  }

  probarRequest(createUserDto: CreateUserDto){
    return `This action creates a user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
};

export {UsersService};