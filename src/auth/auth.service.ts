import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './repository/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategy/jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService, 
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<User>
   {
    return await this.usersRepository.createUser(authCredentialsDto); 
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string,user:User }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { id:user.id }; 
      const accessToken: string =  this.jwtService.sign(payload); 
      return {accessToken,user}; 
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
