import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async signup(@Body() signupDto: SignupDto) {
    return this.usersService.signup(signupDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }
}
