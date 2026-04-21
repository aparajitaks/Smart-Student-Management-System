import express from 'express';
import * as batchController from '../controllers/BatchController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
import { UserRole } from '../interfaces/User.interface';

const router = express.Router();

router.use(protect);

router.post(
  '/transfer', 
  restrictTo(UserRole.ADMIN), 
  batchController.transferStudent
);

router.get(
  '/analytics', 
  restrictTo(UserRole.ADMIN, UserRole.TEACHER), 
  batchController.getBatchAnalytics
);

export default router;
