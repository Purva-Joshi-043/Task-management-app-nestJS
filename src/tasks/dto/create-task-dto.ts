import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateTaskDto {
  @ApiProperty({ required: true, description: 'Title of task' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true, description: 'Desription of task' })
  @IsNotEmpty()
  @IsString()
  description: string;
}

