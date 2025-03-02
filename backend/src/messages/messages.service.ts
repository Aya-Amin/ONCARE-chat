import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';
import { KafkaService } from '../message-queue/kafka.service';
import * as admin from 'firebase-admin';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
        private kafkaService: KafkaService
    ) { }

    async sendMessage(createMessageDto: CreateMessageDto): Promise<Message> {
        // Queue message for reliability
        await this.kafkaService.sendMessage('chat-messages', createMessageDto);

        // Save message to DB
        const createdMessage = new this.messageModel(createMessageDto);
        return createdMessage.save();
    }

    async getMessagesByConversation(conversationId: string): Promise<Message[]> {
        return this.messageModel.find({ conversationId }).sort({ timestamp: 1 }).exec();
    }

    async updateMessageStatus(updateMessageStatusDto: UpdateMessageStatusDto): Promise<Message> {
        const { messageId, status } = updateMessageStatusDto;
        const updateFields = status === 'delivered' ? { deliveryStatus: true } : { deliveryStatus: true, readStatus: true };

        const updatedMessage = await this.messageModel.findByIdAndUpdate(messageId, updateFields, { new: true }).exec() as Message;

        // Notify user via Firebase
        // await this.sendFirebaseNotification(updatedMessage, status);

        return updatedMessage;
    }

    // private async sendFirebaseNotification(message: Message, status: string) {
    //     const payload = {
    //         notification: {
    //             title: 'Message Update',
    //             body: `Your message is now ${status}.`
    //         },
    //         data: { messageId: message.messageId, status: status }
    //     };

    //     await admin.messaging().sendToTopic(`user-${message.senderId}`, payload);
    // }
}
