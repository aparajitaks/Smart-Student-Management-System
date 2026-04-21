import { Request, Response, NextFunction } from 'express';
import { NoticeService } from '../services/NoticeService';

const noticeService = new NoticeService();

export const createNotice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notice = await noticeService.createNotice({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json({
      status: 'success',
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

export const getNotices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { batchId } = req.query;
    const notices = await noticeService.getActiveNotices(req.user.role, batchId as string);
    res.status(200).json({
      status: 'success',
      data: notices
    });
  } catch (error) {
    next(error);
  }
};
