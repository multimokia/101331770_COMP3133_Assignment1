import { model, Schema } from 'mongoose';
import { EMAIL_PROP } from './types/email.js';

export type User = {
  username: string,
  email: string,
  password: string
}

const userSchema = new Schema<User>({
  username: {type: String, required: true, maxLength: 100, unique: true},
  email: EMAIL_PROP,
  password: {type: String, required: true},
});

export const User = model<User>('User', userSchema);
