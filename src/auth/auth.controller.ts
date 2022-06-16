import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from '../entities/user.entity';

@Controller('auth')
@ApiTags('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @ApiOperation({
        summary: 'Api for creating a user'
    })
    @ApiOkResponse({
        description: 'User signed up successfully',
        type: User
    })
    @ApiConflictResponse({
        description: 'Username already exists'
    })
    async signup(
        @Body() authCredentialsDto: AuthCredentialsDto
    ): Promise<User> {
        return await this.authService.signup(authCredentialsDto);
        // NOTE: Always format your response
    }

    @Post('/signin')
    @ApiOkResponse({
        description: 'User signed up successfully'
    })
    @ApiUnauthorizedResponse({
        description: 'Please check your login credentials'
    })
    @ApiOperation({
        summary: 'Api for signing in a user'
    })
    async signIn(
        @Body() authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        return await this.authService.signIn(authCredentialsDto);
    }
}
