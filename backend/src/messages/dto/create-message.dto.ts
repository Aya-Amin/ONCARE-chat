import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 'conv456', description: 'Conversation ID' })
  @IsNotEmpty()
  @IsString()
  conversationId: string;
  
  @ApiProperty({ example: 'user123', description: 'Sender ID' })
  @IsNotEmpty()
  @IsString()
  senderId: string;

  @ApiProperty({ example: 'Hello!', description: 'Message content' })
  @IsNotEmpty()
  @IsString()
  content: string;
}