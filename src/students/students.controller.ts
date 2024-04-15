import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {
    
  }

  @Post("/")
  getStudents(@Body() student: CreateStudentDto) {
    return this.studentsService.createStudents(student);
  }

  @Get("/")
  createStudents() {
    return this.studentsService.getStudents();
  }
}
