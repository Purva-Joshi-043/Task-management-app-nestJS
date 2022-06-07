import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Taskstatus } from '../task-status-enum';

export class UpdateTaskStatusDto {
  @IsEnum(Taskstatus)
  @ApiProperty({required:true,description:'status of task'})
  status: Taskstatus;
}
