import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //para poder manejar con parámetros, Nest también nos ha proporcionado un decorador específico para poder leer bodies, al final, nos ayudará a tener un control más específico.
    if(!createUserDto.first_name || !createUserDto.email || !createUserDto.password) throw new HttpException("IUncomplete values", HttpStatus.BAD_REQUEST);
    return this.usersService.create(createUserDto);
  }

  //Modificaremos la función findAll para limitar el número de usuarios a recibir, para esto, si se manda un query param limit, limitaremos según el número de usuarios indicados, caso contrario 
  //devolverá por defecto 5 usuarios. Utilizaremos un nuevo decorador @Query:

  // @Get()   // ✓ Si usamos Query sin parámetros, tomará todos los parámetros enviados.
  // findAll(@Query() query){ 
  //   const {limit} = query;
  //   console.log(limit);
  //   const users = this.usersService.findAll();
  //   return {status: "Success", payload: users}
  // }

  @Post('/:b')
  probarRequest(@Request() req){ //Ejecutar en postman para ver resultados 👉 http://localhost:5500/user/hello?limit=5
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    return "Todo es un objeto";
  }

  @Get()     // ✓ También podemos limitar exactamente qué valores de los query params tomar, por ejemplo @Query(‘parametro’) alias
  findAll(@Query("limit") limit){ 
    console.log(limit);
    const users = this.usersService.findAll();
    return {status: "Success", payload: users}
  }  

  //El id, que se está pasando como parámetro en la función findOne, update o remove, también es relacionado con un decorador, en este caso @Param. Éste permitirá que se reciba de manera directa 
  //como parámetro de un método http y no necesariamente como un parámetro de una función cualquiera.

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Para poder hacer una validación, podemos preguntar si el parámetro es numérico. En caso de que no lo sea, arrojar un error de Http a partir de un HttpException (La excepción Http y el diccionario de status codes viene incluido en el framework)
    if(isNaN(+id)) throw new HttpException("El id debe ser numero", HttpStatus.BAD_REQUEST);
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

export { UsersController };