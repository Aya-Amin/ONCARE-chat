import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetMessagesDto {
  @ApiProperty({ example: 'conv456', description: 'Conversation ID' })
  @IsNotEmpty()
  @IsString()
  conversationId: string;
}
