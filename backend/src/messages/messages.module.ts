import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message, MessageSchema } from './schemas/message.schema';
import { KafkaService } from '../message-queue/kafka.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
  controllers: [MessagesController],
  providers: [MessagesService, KafkaService],
})
export class MessagesModule {}
