import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsPublic } from 'src/auth/is-public.decorator';
import { UserDto } from './user.dto';
import { Logger } from '@nestjs/common';
import { log } from 'console';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @IsPublic()
    @Post('/create')
    async create(@Body() userObject : UserDto) {
        Logger.log(`Creating user with email: ${userObject.email}`);
        return this.usersService.create(userObject);
    }
}
