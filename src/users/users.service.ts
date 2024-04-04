import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
class UsersService {

  users: Array<User>

  constructor(){ //Creamos una nueva persistencia desde el constructor 
    this.users = [];
  }

  create(createUserDto: CreateUserDto){
    createUserDto.id = this.users.length+1;
    let newUsers = this.users.push(createUserDto);
    return newUsers;
  }

  probarRequest(createUserDto: CreateUserDto){
    return `This action creates a user`;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
};

export {UsersService};