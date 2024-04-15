import { IsNotEmpty, IsString, MinLength } from "class-validator";

class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    
    title: string
    description: string
};

export {CreateTaskDto};