import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class User extends Document {
  @Prop({ default: function () { return this._id; } })
  userId: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // We will hash it before saving
}

export const UserSchema = SchemaFactory.createForClass(User);
