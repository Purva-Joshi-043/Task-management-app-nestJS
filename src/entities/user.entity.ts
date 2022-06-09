import { Task } from './task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column({ unique: true })
    @ApiProperty()
    username: string;

    @Column()
    @ApiProperty()
    password: string;

    @OneToMany((type) => Task, (task) => task.user, {
        eager: true,
        nullable: true
    })
    tasks: Task[];
}
