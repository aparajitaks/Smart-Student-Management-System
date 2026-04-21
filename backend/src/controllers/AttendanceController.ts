import { Request, Response, NextFunction } from 'express';
import { AttendanceService } from '../services/AttendanceService';

const attendanceService = new AttendanceService();

export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const record = await attendanceService.markAttendance(req.body);
    res.status(200).json({
      status: 'success',
      data: record
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const stats = await attendanceService.getStudentAttendance(studentId as string);
    res.status(200).json({
      status: 'success',
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
