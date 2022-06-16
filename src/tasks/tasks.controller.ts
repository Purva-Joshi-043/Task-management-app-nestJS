import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../entities/user.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { Task } from '../entities/task.entity';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';
import {
    ApiTags,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
    ApiOperation
} from '@nestjs/swagger';

@Controller('tasks')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description: 'Please check your login credentials'
})
@ApiTags('tasks')
export class TasksController {
    private readonly logger = new Logger('TasksController');
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    @ApiOkResponse({
        description: 'All tasks successfully fetched',
        type: [Task]
    })
    @ApiOperation({
        summary: 'Api for getting all tasks'
    })
    async getTasks(
        @Query() filterDto: GetTaskFilterDto,
        @GetUser() user: User
    ): Promise<Task[]> {
        this.logger.log(
            `User "${
                user.username
            }" retrieving all tasks.Filters: ${JSON.stringify(filterDto)}`
        );
        return await this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    @ApiOkResponse({
        description: 'task successfully fetched with respective id',
        type: Task
    })
    @ApiOperation({
        summary: 'Api for getting a task by id'
    })
    @ApiNotFoundResponse({ description: 'Task with this ID not found' })
    async getTaskById(
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<Task> {
        return await this.tasksService.getTaskById(id, user);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The task has been successfully created.',
        type: Task
    })
    @ApiOperation({
        summary: 'Api for creating a task'
    })
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        this.logger.verbose(
            `User "${user.username}" Creating a new task.Data: ${JSON.stringify(
                createTaskDto
            )}`
        );
        return this.tasksService.createTask(createTaskDto, user); // NOTE: use await
    }

    @Patch('/:id/status')
    @ApiOkResponse({
        description: 'The task has been successfully updated.',
        type: Task
    })
    @ApiOperation({
        summary: 'Api for updating task status'
    })
    updateTaskStatus(
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<Task> {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status, user);
    }

    @Delete('/:id')
    @ApiOkResponse({
        description: 'The task has been successfully deleted.'
    })
    @ApiOperation({
        summary: 'Api for deleting a task by id.'
    })
    deleteTaskById(
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<string> {
        return this.tasksService.deleteTaskById(id, user);
    }
}
