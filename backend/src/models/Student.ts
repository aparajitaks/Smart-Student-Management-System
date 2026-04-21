import { Schema } from 'mongoose';
import { UserModel } from './User';
import { UserRole } from '../interfaces/User.interface';

const studentSchema = new Schema({
  rollNumber: { type: String, required: true, unique: true },
  batchId: { type: Schema.Types.ObjectId, ref: 'Batch' },
  guardianName: { type: String, required: true },
  phone: { type: String }
});

export const StudentModel = UserModel.discriminator(UserRole.STUDENT, studentSchema);
