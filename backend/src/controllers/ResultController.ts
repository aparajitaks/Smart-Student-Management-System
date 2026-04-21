import { Request, Response, NextFunction } from 'express';
import { ResultService } from '../services/ResultService';

const resultService = new ResultService();

export const addResult = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await resultService.addResult(req.body);
    res.status(201).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await resultService.getStudentResults(req.params.studentId as string);
    res.status(200).json({
      status: 'success',
      data: results
    });
  } catch (error) {
    next(error);
  }
};
