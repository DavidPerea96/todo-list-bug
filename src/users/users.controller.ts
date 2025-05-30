import { Body, Controller, Post, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsPublic } from 'src/auth/is-public.decorator';
import { UserDto } from './user.dto';
import { Logger } from '@nestjs/common';
import e from 'express';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    // ********************************* */

    // Public endpoint to find a user by email

    @IsPublic()
    @Get('/:email')
    async findByEmail(@Body('email') email: string) {
        // Log the email being searched for
        Logger.log(`User is searching for user with email: ${email}`);
        // Call the service to find the user
        const user = await this.usersService.findByEmail(email);
        // If no user is found, return null
        if (!user) {
            Logger.warn(`No user found with email: ${email}`);
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else {
            Logger.log(`${user.email} found in the database`);
            // Save just the public data of the user    
            const userPublicData = {
                id : user.id,
                email : user.email,
                fullname : user.fullname,
            };
            // We only return public data, excluding the password
            return userPublicData;
        }
    }


    // Public endpoint to create a user

    @IsPublic()
    @Post('/create')
    async create(@Body() userObject : UserDto) {
        // Log the email of the user being created
        Logger.log(`Creating user with email: ${userObject.email}`);
        // Call the service to create the user
        return this.usersService.create(userObject);
    }
}
