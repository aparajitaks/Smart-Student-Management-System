import { AttendanceModel } from '../models/Attendance';
import { AppError } from '../utils/AppError';
import mongoose from 'mongoose';

export class AttendanceService {
  async markAttendance(data: {
    studentId: string;
    batchId: string;
    date: Date;
    status: 'PRESENT' | 'ABSENT' | 'LATE';
  }) {
    const existing = await AttendanceModel.findOne({
      studentId: data.studentId,
      date: {
        $gte: new Date(new Date(data.date).setHours(0, 0, 0, 0)),
        $lt: new Date(new Date(data.date).setHours(23, 59, 59, 999))
      }
    });

    if (existing) {
      existing.status = data.status;
      return await existing.save();
    }

    return await AttendanceModel.create(data);
  }

  async getStudentAttendance(studentId: string) {
    const records = await AttendanceModel.find({ studentId });
    const total = records.length;
    if (total === 0) return { percentage: 0, records: [] };

    const present = records.filter(r => r.status === 'PRESENT').length;
    const late = records.filter(r => r.status === 'LATE').length;
    
    // Late counts as 0.5 for percentage calculation (example logic)
    const percentage = ((present + (late * 0.5)) / total) * 100;

    return {
      percentage: Math.round(percentage * 100) / 100,
      total,
      present,
      absent: records.filter(r => r.status === 'ABSENT').length,
      late,
      records
    };
  }
}
