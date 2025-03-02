import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@ApiTags('Messages')
@UseGuards(FirebaseAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a new message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.sendMessage(createMessageDto);
  }

  @Get('conversation/:conversationId')
  @ApiOperation({ summary: 'Get messages by conversation' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
  async getMessages(@Param('conversationId') conversationId: string) {
    return this.messagesService.getMessagesByConversation(conversationId);
  }

  @Post('update-status')
  @ApiOperation({ summary: 'Update message status (delivered/read)' })
  @ApiResponse({ status: 200, description: 'Message status updated successfully' })
  async updateMessageStatus(@Body() updateMessageStatusDto: UpdateMessageStatusDto) {
    return this.messagesService.updateMessageStatus(updateMessageStatusDto);
  }
}
