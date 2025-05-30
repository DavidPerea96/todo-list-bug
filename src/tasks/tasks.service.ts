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

    // ********************************* */

    // Method to find all tasks that belong to a user
    async listTasks(userId : string) {
        // Using TypeORM to create a query builder to find tasks by user ID
        const tasks = await this.tasksRepository
        .createQueryBuilder('tasks')
        .leftJoinAndSelect('tasks.owner', 'owner')
        .where (`tasks.owner.id = "${userId}"`, { userId })
        .getMany();

        return tasks;
    }

    // Method to find a specific task by ID
    async getTask(id: string) {
        // Using TypeORM to create a query builder to find a task by its ID
        const task = await this.tasksRepository
            .createQueryBuilder('tasks')
            .leftJoinAndSelect('tasks.owner', 'owner')
            .where(`tasks.id = "${id}"`, { id })
            .getOne();
        return task;
    }
    
    // Method to edit a task
    async editTask(tasksDto : TasksDto) {
        await this.tasksRepository.update(tasksDto.id, tasksDto);
        console.log(tasksDto);
        const editedTask = await this.getTask(tasksDto.id);

        return editedTask;
    }
}

