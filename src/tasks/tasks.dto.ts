import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UserDto } from "./user.dto";

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
    @Type(() => UserDto)
    owner: UserDto;
}