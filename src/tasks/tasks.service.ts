import { Injectable, NotFoundException } from '@nestjs/common';
import { Taskstatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) 
    private readonly tasksRepository: TasksRepository,
  ) {}
  

  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return await this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.tasksRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(
    id: string,
    status: Taskstatus,
    user: User,
  ): Promise<Task> {
    let task = await this.getTaskById(id, user);
    task.status = status;
    task = await this.tasksRepository.save(task);
    return task;
  }

  async deleteTaskById(id: string, user: User): Promise<string> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return 'Deleted Succesfully';
  }
}
