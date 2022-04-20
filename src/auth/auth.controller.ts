import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} 
  
  @Post('/signup')
  async signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return await this.authService.signup(authCredentialsDto); 
    // NOTE: Always format your response
  }


  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto); 
  }
}
