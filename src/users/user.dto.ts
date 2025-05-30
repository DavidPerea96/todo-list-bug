import { IsNotEmpty, IsString } from "class-validator";


export class UserDto {

    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsString()
    pass: string;

}