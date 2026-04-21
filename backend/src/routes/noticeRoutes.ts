import express from 'express';
import * as noticeController from '../controllers/NoticeController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
import { UserRole } from '../interfaces/User.interface';

const router = express.Router();

router.use(protect);

router.post(
  '/', 
  restrictTo(UserRole.ADMIN, UserRole.TEACHER), 
  noticeController.createNotice
);

router.get('/', noticeController.getNotices);

export default router;
