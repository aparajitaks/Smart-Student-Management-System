import { Schema } from 'mongoose';
import { UserModel } from './User';
import { UserRole } from '../interfaces/User.interface';

const teacherSchema = new Schema({
  specialization: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true }
});

export const TeacherModel = UserModel.discriminator(UserRole.TEACHER, teacherSchema);
