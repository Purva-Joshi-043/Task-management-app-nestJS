import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Taskstatus } from "../task-status-enum";

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(Taskstatus)
  status?: Taskstatus;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search?: string;
}