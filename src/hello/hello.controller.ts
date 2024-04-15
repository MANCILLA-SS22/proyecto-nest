import { Controller, Get, Param, HttpCode, Req, Res, ParseIntPipe, ParseBoolPipe, Query, UseGuards } from '@nestjs/common';
import { HelloService } from './hello.service';
import { Request, Response } from 'express';
import { ValidatestudentPipe } from './pipes/validatestudent/validatestudent.pipe';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get("/hello")
  index(@Req() req: Request, @Res() res: Response){
    console.log(req.url)
    res.status(200).json({message: 'hello world!'})
  }  

  @Get('new')
  @HttpCode(201)
  somethingNew(){
    return "Something new";
  }  

  @Get("/notfound")
  @HttpCode(404)
  notFoundPage(){
    return '404 nnot found';
  }

  @Get("/error")
  @HttpCode(404)
  errorPage(){
    return 'Error page';
  }


  @Get("ticket/:num")
  getNumber(@Param('num', ParseIntPipe) num: number){
    return num + 14;
  }

  @Get("active/:status")
  @UseGuards(AuthGuard)  
  isStudentActive(@Param ('status', ParseBoolPipe) status: boolean){
    return status;
  } //ñ
  
  @Get("greet")  //http://localhost:5500/hello/greet?name=german&age=25
  @UseGuards(AuthGuard)
  greet(@Query(ValidatestudentPipe) query: {name: string, age: number}){
    // console.log(typeof query.age);
    // console.log(typeof query.name);
    return `Hello ${query.name}, you are ${query.age} years old`
  }
}
