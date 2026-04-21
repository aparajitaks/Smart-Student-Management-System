import { Schema } from 'mongoose';
import { UserModel } from './User';
import { UserRole } from '../interfaces/User.interface';

const adminSchema = new Schema({});

export const AdminModel = UserModel.discriminator(UserRole.ADMIN, adminSchema);
