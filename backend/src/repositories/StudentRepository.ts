import { StudentModel } from '../models/Student';
import { BaseRepository } from './BaseRepository';

export class StudentRepository extends BaseRepository<any> {
  constructor() {
    super(StudentModel);
  }

  async findByRollNumber(rollNumber: string) {
    return this.model.findOne({ rollNumber });
  }

  async updateBatch(studentId: string, batchId: string) {
    return this.model.findByIdAndUpdate(studentId, { batchId }, { new: true });
  }

  async search(query: string) {
    return this.model.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { rollNumber: { $regex: query, $options: 'i' } }
      ]
    }).limit(10);
  }
}
