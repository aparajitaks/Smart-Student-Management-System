import { Request, Response, NextFunction } from 'express';
import { StudentService } from '../services/StudentService';

const studentService = new StudentService();

export const searchStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    const students = await studentService.searchStudents(q as string);
    res.status(200).json({
      status: 'success',
      data: { students }
    });
  } catch (error) {
    next(error);
  }
};
