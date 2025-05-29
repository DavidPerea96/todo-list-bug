import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TasksDto } from './tasks.dto';
import { Task } from 'src/entities/task.entity';
import { th } from '@faker-js/faker/.';


@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get('')
    @UseGuards(AuthGuard)
    async listTasks(@Req() req) {
        const userId = req.user.id;
        return this.tasksService.listTasks(userId);
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async getTask(@Param('id') id: string, @Req() req) {
        const task = await this.tasksService.getTask(id);
        const ownerId = task.owner.id;
        const userId = req.user.id;
        if (userId !== ownerId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        } else {
            return task;
        }
    }

    @Post('/edit')
    @UseGuards(AuthGuard)
    async editTask(@Body() tasksDto : TasksDto, @Req() req) {
        const userId = req.user.id;
        const taskOwnerId = tasksDto.owner.id;
        if (userId !== taskOwnerId) {
            throw new HttpException ('Forbidden', HttpStatus.FORBIDDEN);
        } else {
            return this.tasksService.editTask(tasksDto);
        }
    }
}
