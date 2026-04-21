import { BatchModel, IBatch } from '../models/Batch';
import { BaseRepository } from './BaseRepository';
import { StudentModel } from '../models/Student';

export class BatchRepository extends BaseRepository<IBatch> {
  constructor() {
    super(BatchModel);
  }

  async getBatchStudentCount(batchId: string): Promise<number> {
    return StudentModel.countDocuments({ batchId });
  }

  async hasCapacity(batchId: string): Promise<boolean> {
    const batch = await this.findById(batchId);
    if (!batch) return false;
    const currentCount = await this.getBatchStudentCount(batchId);
    return currentCount < batch.capacity;
  }
}
