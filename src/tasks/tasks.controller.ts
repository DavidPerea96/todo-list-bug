import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Req} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksDto } from './tasks.dto';



@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private logger: Logger = new Logger('TasksController')
    ) {}

    // ********************************* */


    // Endpoint to list tasks for the authenticated user
    @Get('')
    async listTasks(@Req() req) {
        const userId = req.user.id;
        // Log the user ID requesting the task list
        this.logger.log(`User with ID ${userId} requested it's own task list`);
        // Call the service to list tasks
        return this.tasksService.listTasks(userId);
    }

    // Endpoint to get a specific task by ID
    @Get('/:id')
    async getTask(@Param('id') id: string, @Req() req) {
        // Save the full task obntained from the ID
        const task = await this.tasksService.getTask(id);
        // Save the owner of the task by ID
        const ownerId = task.owner.id;
        // Save the user that is requesting the task by ID
        const userId = req.user.id;
        if (userId !== ownerId) {
            // Log a warning if the user is trying to access a task that does not belong to them
            this.logger.warn(`User with ID ${userId} attempted to access task ${id} owned by user ${ownerId}`);
            // Throw an exception if the user is not the owner of the task
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        } else {
            // Log the user ID accessing the task
            this.logger.log(`User with ID ${userId} accessed task ${id}`);
            // Return the task if the user is the owner
            return task;
        }
    }

    // Endpoint to edit a task
    @Post('/edit')
    async editTask(@Body() tasksDto : TasksDto, @Req() req) {
        // Save the user ID from the request
        const userId = req.user.id;
        // Save the ID of the task owner
        const taskOwnerId = tasksDto.owner.id;
        if (userId !== taskOwnerId) {
            // Log a warning if the user is trying to edit a task that does not belong to them
            this.logger.warn(`User with ID ${userId} attempted to edit task ${tasksDto.id} owned by user ${taskOwnerId}`);
            // Throw an exception if the user is not the owner of the task    
            throw new HttpException ('Forbidden', HttpStatus.FORBIDDEN);
        } else {
            // Log the user ID editing the task
            this.logger.log(`User with ID ${userId} edited task ${tasksDto.id}`);
            // Call the service to edit the task
            return this.tasksService.editTask(tasksDto);
        }
    }
}
