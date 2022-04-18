import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { UserRepository } from "./users.repository";

// NOTE: create a strategy directory and put the strategy inside them
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository) // NOTE: Do not use InjectRepository when you have a custom repository
        private usersRepository: UserRepository,
        private configService:ConfigService // NOTE: make readonly
    ){
      super({
        secretOrKey: configService.get('JWT_SECRET'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // NOTE: use ignoreExpiration: false
      });
  }
  
  // NOTE: use proper indentation

        async validate(payload: JwtPayload): Promise<User>{
            const {username} = payload;
            const user: User = await this.usersRepository.findOne({username})
            if(!user){
                throw new UnauthorizedException(); // NOTE: use custom message while throwing a new exception
            }
            return user;
        }
   
}