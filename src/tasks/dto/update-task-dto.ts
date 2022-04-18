import { IsEnum } from "class-validator";
import { Taskstatus } from "../task-status-enum";

export class UpdateTaskDto {
  title: string;
  description: string; // NOTE: remove unused fields
  @IsEnum(Taskstatus)
  status: Taskstatus;
}
