import { Request, Response, NextFunction } from 'express';
import { BatchService } from '../services/BatchService';

const batchService = new BatchService();

export const transferStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId, fromBatchId, toBatchId, reason } = req.body;
    const adminId = req.user.id;

    const result = await batchService.transferStudent(
      studentId,
      fromBatchId,
      toBatchId,
      adminId,
      reason
    );

    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getBatchAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const analytics = await batchService.getBatchAnalytics();
    res.status(200).json({
      status: 'success',
      data: analytics
    });
  } catch (error) {
    next(error);
  }
};
