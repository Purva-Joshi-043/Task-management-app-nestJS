import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ required: true, description: 'Username of user' })
  username: string;
  // NOTE: use @IsNotEmpty() on both of them

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty({ required: true, description: 'password of user'})
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
