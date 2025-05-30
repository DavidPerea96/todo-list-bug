import { Injectable, Logger } from '@nestjs/common';
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

    async create(userObject: UserDto) {
        const user = new User();
        user.email = userObject.email;
        user.pass = userObject.pass;
        user.fullname = userObject.fullname;

        await this.usersRepository.save(user);

        return user;
    }

    async findOne(email: string) {
        const user = await this.usersRepository.findOneBy({
            email,
        });

        return user;
    }
}
