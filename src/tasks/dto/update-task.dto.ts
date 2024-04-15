import { IsIn, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../entities/task.entity";


class UpdatedTaskDto{
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    @IsIn([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status?: TaskStatus;
}

export {UpdatedTaskDto};
