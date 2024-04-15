import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
class StudentsService {
  private students: any[] = [
    {
      id: 1,
      name: "German Mancilla",
      phone: 19278472764
    },
    {
      id: 2,
      name: "Doble T. Matutino",
      phone: 19278472454      
    }    
  ];

  getStudents(){
    return this.students;
  }

  createStudents(student: CreateStudentDto){
    this.students.push(student);
    return {
      ...student,
      id: this.students.length + 1
    };
  }
}

export {StudentsService};