import mongoose, { Schema, Document } from 'mongoose';
import { IUser, UserRole } from '../interfaces/User.interface';

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { 
      type: String, 
      enum: Object.values(UserRole), 
      required: true 
    }
  },
  {
    timestamps: true,
    discriminatorKey: 'role'
  }
);

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
