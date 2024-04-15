import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('user')
class UsersController {
  constructor(private readonly usersService: UsersService, private config: ConfigService) {
    //Cuando declaremos un controlador, dentro del constructor de dicho controlador podemos inyectar el servicio de configuración. Automáticamente, podremos utilizarlo en cualquier endpoint que deseemos.
  } 

  /* //Utilizacion de QUERIES en el metodo get
  @Get() //Modificaremos la función findAll para limitar el número de usuarios a recibir, para esto, si se manda un query param limit, limitaremos según el número de usuarios indicados, caso contrario devolverá por defecto 5 usuarios. Utilizaremos un nuevo decorador @Query:
  async findAll(@Query() query){           // ✓ Si usamos Query sin parámetros, tomará todos los parámetros enviados.
  // async findAll(@Query("limit") limit){ // ✓ También podemos limitar exactamente qué valores de los query params tomar, por ejemplo @Query(‘parametro’) alias. (Para que funcione, descomentar esta linea y comentar la linea de arriba y abajo)
    const {limit} = query;
    console.log(limit);
    console.log(`Quiero una papa con ${this.config.get<string>("PAPA")}`); //En la ruta base del método get de /users, utilizamos el config para obtener la variable PAPA
    const users = await this.usersService.findAll();
    return {status: "Success", payload: users}
  } */

  @Get()
  async findAll(){           
    console.log(`Quiero una papa con ${this.config.get<string>("PAPA")}`); //En la ruta base del método get de /users, utilizamos el config para obtener la variable PAPA
    const users = await this.usersService.findAll();
    return {status: "Success", payload: users}
  };

  //El id, que se está pasando como parámetro en la función findOne, update o remove, también es relacionado con un decorador, en este caso @Param. Éste permitirá que se reciba de manera directa como parámetro de un método http y no necesariamente como un parámetro de una función cualquiera.
  @Get('/:id')
  findOne(@Param('id') id: string) {
    // Para poder hacer una validación, podemos preguntar si el parámetro es numérico. En caso de que no lo sea, arrojar un error de Http a partir de un HttpException (La excepción Http y el diccionario de status codes viene incluido en el framework)
    if(isNaN(+id)) throw new HttpException("El id debe ser numero", HttpStatus.BAD_REQUEST);
    return this.usersService.findOne(+id);
  };
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto){
    //para poder manejar con parámetros, Nest también nos ha proporcionado un decorador específico para poder leer bodies, al final, nos ayudará a tener un control más específico.
    if(!createUserDto.first_name || !createUserDto.email || !createUserDto.password) throw new HttpException("Uncomplete values", HttpStatus.BAD_REQUEST);
    return await this.usersService.create(createUserDto);
  };  

  @Post('/:b')
  probarRequest(@Request() req){ //Ejecutar en postman para ver resultados 👉 http://localhost:5500/user/hello?limit=5
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    return "Todo es un objeto";
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