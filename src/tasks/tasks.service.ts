import {v4} from 'uuid'
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { UpdatedTaskDto } from './dto/update-task.dto';

@Injectable()
class TasksService{
  
  private tasks: Task[] = [{
    id: '1',
    title: 'first task',
    description: 'some task',
    status: TaskStatus.PENDING
}]

  getAllTasks(){
    return this.tasks;
  }

  getTasks(id: string){
    const taskFound =  this.tasks.find(event => event.id === id);
    if(!taskFound) return new NotFoundException(`Task with id ${id} not found!`);
    return taskFound;
  }  

  createTask(title: string, description: string){
    const task = {
        id: v4(),
        title: title,
        description: description,
        status: TaskStatus.PENDING
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string){
    return this.tasks = this.tasks.filter(event => event.id !== id);
  }

  //Devuelve el objeto que se ha actualizado en formato de tipo "Task". Al poner "(: Task" indicamos el tipo de formato que se va a retornar. Puede ser tambien: string, object, array, etc. Y, el valor que retornammos al usar la palabra reservada "return"
  //debe ser exactamente el mismo tipo de dato que, en este caso, es de tipo "Task".
  updateTaskPatch(id: string, updatedFields: UpdatedTaskDto): Task{
    // const task = this.getTaskById(id)
    const task = this.tasks.find(event => event.id === id);
    const newTask = Object.assign(task, updatedFields);
    this.tasks = this.tasks.map(event => event.id === id ? newTask : event);
    return newTask;
  }

  // getTaskById(id: string): Task{ 
  //   return this.tasks.find(event => event.id === id); //Retorna un objeto
  // };
}

export {TasksService};