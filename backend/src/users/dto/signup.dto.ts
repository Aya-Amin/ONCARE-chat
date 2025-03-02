import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'John Doe', description: 'User Name' })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ example: 'user@example.com', description: 'User Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePassword123', description: 'User Password' })
  @IsString()
  @MinLength(6)
  password: string;
}
