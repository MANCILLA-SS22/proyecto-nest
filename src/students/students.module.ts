import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
})

export class StudentsModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes({path: '/students', method: RequestMethod.GET},{path: '/students', method: RequestMethod.POST}).apply(AuthMiddleware).forRoutes("students");
  }
}
