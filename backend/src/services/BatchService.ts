import { BatchRepository } from '../repositories/BatchRepository';
import { StudentRepository } from '../repositories/StudentRepository';
import { TransferLogModel } from '../models/TransferLog';
import { AppError } from '../utils/AppError';
import mongoose from 'mongoose';

export class BatchService {
  private batchRepo: BatchRepository;
  private studentRepo: StudentRepository;

  constructor() {
    this.batchRepo = new BatchRepository();
    this.studentRepo = new StudentRepository();
  }

  async transferStudent(
    studentId: string,
    fromBatchId: string,
    toBatchId: string,
    adminId: string,
    reason?: string
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Validate student
      const student = await this.studentRepo.findById(studentId);
      if (!student) throw new AppError('Student not found', 404);

      // 2. Validate destination batch capacity
      const hasCapacity = await this.batchRepo.hasCapacity(toBatchId);
      if (!hasCapacity) throw new AppError('Destination batch is full', 400);

      // 3. Update student batch
      await this.studentRepo.updateBatch(studentId, toBatchId);

      // 4. Create transfer log
      await TransferLogModel.create([{
        studentId,
        fromBatchId,
        toBatchId,
        transferredBy: adminId,
        reason
      }], { session });

      await session.commitTransaction();
      return { message: 'Transfer successful' };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getBatchAnalytics() {
    const batches = await this.batchRepo.find();
    const analytics = await Promise.all(batches.map(async (batch) => {
      const count = await this.batchRepo.getBatchStudentCount(batch._id as string);
      return {
        name: batch.name,
        count,
        capacity: batch.capacity,
        fillRate: (count / batch.capacity) * 100
      };
    }));
    return analytics;
  }

  async getAllBatches() {
    return await this.batchRepo.find();
  }
}
