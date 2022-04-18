import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity,ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Taskstatus } from "./task-status-enum";

@Entity()
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status:Taskstatus;

    @ManyToOne(type => User,user=> user.tasks,{eager:false}) // NOTE: use spaces and format the document
    @Exclude({toPlainOnly:true})
    user:User;


}
