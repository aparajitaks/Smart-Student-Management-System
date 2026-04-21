import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  studentId: mongoose.Types.ObjectId;
  batchId: mongoose.Types.ObjectId;
  date: Date;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
}

const attendanceSchema = new Schema<IAttendance>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    batchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
    date: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ['PRESENT', 'ABSENT', 'LATE'], 
      required: true 
    }
  },
  { timestamps: true }
);

export const AttendanceModel = mongoose.model<IAttendance>('Attendance', attendanceSchema);
