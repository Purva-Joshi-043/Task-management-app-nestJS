import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Taskstatus } from "../task-status-enum";

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(Taskstatus)
  status?: Taskstatus;

  @IsOptional()
  @IsNotEmpty()
    // NOTE: use IsString()
  search?: string;
}