import { IsEnum } from "class-validator";
import { Taskstatus } from "../task-status-enum";

export class UpdateTaskDto {
  title: string;
  description: string;
  @IsEnum(Taskstatus)
  status: Taskstatus;
}
