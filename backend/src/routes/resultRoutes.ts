import express from 'express';
import * as resultController from '../controllers/ResultController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
import { UserRole } from '../interfaces/User.interface';

const router = express.Router();

router.use(protect);

router.post(
  '/', 
  restrictTo(UserRole.TEACHER, UserRole.ADMIN), 
  resultController.addResult
);

router.get('/:studentId', resultController.getStudentResults);

export default router;
