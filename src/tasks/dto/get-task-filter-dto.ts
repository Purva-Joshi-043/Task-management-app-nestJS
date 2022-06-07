import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Taskstatus } from "../task-status-enum";

export class GetTaskFilterDto {
  @IsOptional()
  @ApiProperty({ required: false, description: 'status of task' })
  @IsEnum(Taskstatus)
  status?: Taskstatus;

  @IsOptional()
  @ApiProperty({ required: false, description: 'search filter for task' })
  @IsNotEmpty()
  @IsString()
  search?: string;
}