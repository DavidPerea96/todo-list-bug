import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TaskOwnerDto } from "./taskOwer.dto";



export class TasksDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    done: boolean;

    @IsString()
    @IsNotEmpty()
    dueDate: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => TaskOwnerDto)
    owner: TaskOwnerDto;
}