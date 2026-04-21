import express from 'express';
import * as attendanceController from '../controllers/AttendanceController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
import { UserRole } from '../interfaces/User.interface';

const router = express.Router();

router.use(protect);

router.post(
  '/mark', 
  restrictTo(UserRole.TEACHER, UserRole.ADMIN), 
  attendanceController.markAttendance
);

router.get(
  '/report/:studentId', 
  attendanceController.getStudentAttendance
);

export default router;
