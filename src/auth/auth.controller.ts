import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {} // NOTE: make injected variables readonly
  // NOTE: provide a new line
  @Post('/signup')
  async signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> { // NOTE: can not be void as you will be returning some response, it maybe user object(recommended) or any message
    return this.authService.signup(authCredentialsDto); // NOTE: use await
    // NOTE: Always format your response
  }
  // NOTE: Give a new line after each function
  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto); // NOTE: use await
  }
}
