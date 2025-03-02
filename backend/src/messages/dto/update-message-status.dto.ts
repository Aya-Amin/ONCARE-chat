import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateMessageStatusDto {
  @ApiProperty({ example: 'msg123', description: 'Message ID' })
  @IsNotEmpty()
  @IsString()
  messageId: string;

  @ApiProperty({ example: 'delivered', description: 'Status (delivered/read)' })
  @IsNotEmpty()
  @IsString()
  status: 'delivered' | 'read';
}
