import { IsEnum } from 'class-validator';
import { Taskstatus } from '../task-status-enum';

export class UpdateTaskStatusDto {
  @IsEnum(Taskstatus)
  status: Taskstatus;
}
