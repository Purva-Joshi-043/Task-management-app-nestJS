import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) // NOTE: Do not use InjectRepository if you already have a custom repository
    private usersRepository: UserRepository,
    private jwtService: JwtService, // NOTE: make readonly
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto); // NOTE: use await
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username }; // NOTE: use id instead of username
      const accessToken: string = await this.jwtService.sign(payload); // NOTE: do not use await when not required, I believe sign() is sync method, if not, ignore this note
      return { accessToken }; // NOTE: also return the user object
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
