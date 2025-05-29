import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { TasksDto } from './tasks.dto';



@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
    ) {}

    async listTasks(userId : string) {
        const tasks = await this.tasksRepository
        .createQueryBuilder('tasks')
        .leftJoinAndSelect('tasks.owner', 'owner')
        .where(`tasks.owner.id = "${userId}"`)
        .getMany();

        return tasks;
    }


    async getTask(id: string) {
        const task = await this.tasksRepository
            .createQueryBuilder('tasks')
            .leftJoinAndSelect('tasks.owner', 'owner')
            .where(`tasks.id = "${id}"`)
            .getOne();
        return task;
    }
 
    async editTask(tasksDto : TasksDto) {
        await this.tasksRepository.update(tasksDto.id, tasksDto);
        console.log(tasksDto);
        const editedTask = await this.getTask(tasksDto.id);

        return editedTask;
    }
}

