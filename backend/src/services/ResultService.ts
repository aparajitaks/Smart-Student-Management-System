import { ResultModel } from '../models/Result';

export class ResultService {
  async addResult(data: any) {
    return await ResultModel.create(data);
  }

  async getStudentResults(studentId: string) {
    return await ResultModel.find({ studentId }).sort({ createdAt: -1 });
  }

  async getBatchRankBoard(batchId: string) {
    // Advanced aggregation for ranking (simplified example)
    return await ResultModel.aggregate([
      { $match: { batchId: new mongoose.Types.ObjectId(batchId) } },
      {
        $group: {
          _id: '$studentId',
          totalMarks: { $sum: '$marks' },
          avgPercentage: { $avg: '$marks' }
        }
      },
      { $sort: { totalMarks: -1 } }
    ]);
  }
}

import mongoose from 'mongoose';
