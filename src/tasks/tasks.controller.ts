import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Req} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksDto } from './tasks.dto';



@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private logger: Logger = new Logger('TasksController')
    ) {}

    @Get('')
    async listTasks(@Req() req) {
        const userId = req.user.id;
        this.logger.log(`User with ID ${userId} requested it's own task list`);
        return this.tasksService.listTasks(userId);
    }

    @Get('/:id')
    async getTask(@Param('id') id: string, @Req() req) {
        const task = await this.tasksService.getTask(id);
        const ownerId = task.owner.id;
        const userId = req.user.id;
        if (userId !== ownerId) {
            this.logger.warn(`User with ID ${userId} attempted to access task ${id} owned by user ${ownerId}`);
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        } else {
            this.logger.log(`User with ID ${userId} accessed task ${id}`);
            return task;
        }
    }

    @Post('/edit')
    async editTask(@Body() tasksDto : TasksDto, @Req() req) {
        const userId = req.user.id;
        const taskOwnerId = tasksDto.owner.id;
        if (userId !== taskOwnerId) {
            this.logger.warn(`User with ID ${userId} attempted to edit task ${tasksDto.id} owned by user ${taskOwnerId}`);
            throw new HttpException ('Forbidden', HttpStatus.FORBIDDEN);
        } else {
            this.logger.log(`User with ID ${userId} edited task ${tasksDto.id}`);
            return this.tasksService.editTask(tasksDto);
        }
    }
}
