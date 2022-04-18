import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

// NOTE: create a repository directory and put this inside the directory

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user); // NOTE: must return a value / message
    } catch (error) {
      if (error.code === '23505') { // NOTE: For single line conditionals, remove the {}
        //duplicate username
        throw new ConflictException('Username already eists');
      } else {
        throw new InternalServerErrorException();
      }
      console.log(error.code); // NOTE: unreachable code, remove them
    }
  }
}
