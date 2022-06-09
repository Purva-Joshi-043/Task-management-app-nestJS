import { createParamDecorator,ExecutionContext } from "@nestjs/common";
import { User } from "../../entities/user.entity";

// NOTE: use separate directory to store this file
export const GetUser = createParamDecorator((_data,ctx:ExecutionContext):User =>{
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})