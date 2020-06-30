import { Document, Schema, model } from 'mongoose';

// Setup mongose user schema
// https://stackoverflow.com/a/34482413/4422856

import bcrypt from 'bcryptjs';
import { IEvent, eventSchema } from './Event';

export interface IUserRegistrationData {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export function verifyPassword(user: IUser, password: string) {
  return bcrypt.compareSync(password, user.password);
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    events: Array<IEvent>;
    insertedAt: Date;
}

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  events: [{ type: eventSchema }],
  inserterAt: { type: Date, default: Date.now },
});

// tslint:disable-next-line
export const User = model<IUser>('User', UserSchema);
