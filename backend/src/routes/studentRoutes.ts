import express from 'express';
import * as studentController from '../controllers/StudentController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
import { UserRole } from '../interfaces/User.interface';

const router = express.Router();

router.use(protect);

router.get(
  '/search',
  restrictTo(UserRole.ADMIN, UserRole.TEACHER),
  studentController.searchStudents
);

export default router;
