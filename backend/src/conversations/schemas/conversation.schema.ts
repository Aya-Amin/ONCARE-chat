import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

@Schema()
export class Conversation extends Document {
    @Prop({ default: function () { return this._id.toString(); } })
    conversationID: string;

    @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'User' }], required: true })
    userIDs: mongooseSchema.Types.ObjectId[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
