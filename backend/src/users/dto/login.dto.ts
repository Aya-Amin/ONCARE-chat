import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'User Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePassword123', description: 'User Password' })
  @IsString()
  @MinLength(6)
  password: string;
}
