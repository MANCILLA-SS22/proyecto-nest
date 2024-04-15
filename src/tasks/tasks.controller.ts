import { Body, Controller , Get, Post, Delete, Param, Patch, Res, Req, Query, Put, HttpCode, ParseIntPipe, ParseBoolPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdatedTaskDto } from './dto/update-task.dto';

@Controller('/tasks')
class TasksController {
  
  constructor(private tasksService: TasksService) {}

  @Get("/getAllTasks") 
  getAllTasks(@Query() query: any){
    console.log(query);
    return this.tasksService.getAllTasks()
  }

  @Get("/:id")
  getTasks(@Param() id: string){
    console.log(id);
    return this.tasksService.getTasks(id);
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDto){
    return this.tasksService.createTask(newTask.title, newTask.description);
  };

  @Delete('/:id')
  deleteTask(@Param("id") id: string){
    this.tasksService.deleteTask(id)
  }

  @Patch("/:id")
  updateTaskPatch(@Param("id") id: string, @Body() updatedFields: UpdatedTaskDto){
    return this.tasksService.updateTaskPatch(id, updatedFields);
  };

}

export {TasksController};