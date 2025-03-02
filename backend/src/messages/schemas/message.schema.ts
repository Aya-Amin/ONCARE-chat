import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ default: function () { return this._id.toString(); } })
  messageId: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Conversation', required: true })
  conversationId: mongooseSchema.Types.ObjectId;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User', required: true })
  senderId: mongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ default: false })
  deliveryStatus: boolean;

  @Prop({ default: false })
  readStatus: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);