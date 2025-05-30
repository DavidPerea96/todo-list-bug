import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    // ********************************* */

    // Method to  create a new user

    async create(userObject: UserDto) {

        // Look if the user already exists in the database
        const existingUser = await this.usersRepository.findOneBy({
        email: userObject.email,
        });
        if (existingUser !== null) {
            // Error return for the attempt to create an existing user
            throw new HttpException('User already Exist', HttpStatus.BAD_REQUEST);
        } else {

            // Create new user in case it does not exist
        const user = new User();
        user.email = userObject.email;
        user.pass = userObject.pass;
        user.fullname = userObject.fullname;

            //Calling the repository to save the user
        await this.usersRepository.save(user);

        return user;
        }

    }
    
    // Method to find a user by email
    
    async findByEmail(email: string) {
        const user = await this.usersRepository.findOneBy({
            email: email,
        });

        return user;
    }
}
