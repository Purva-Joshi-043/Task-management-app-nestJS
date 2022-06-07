import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Taskstatus } from './task-status-enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  status: Taskstatus;

  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
