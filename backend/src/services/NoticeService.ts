import { NoticeModel } from '../models/Notice';

export class NoticeService {
  async createNotice(data: any) {
    return await NoticeModel.create(data);
  }

  async getActiveNotices(role: string, batchId?: string) {
    const query: any = {
      $or: [
        { targetBatchId: null }, // Global
        { targetBatchId: batchId } // Specific
      ],
      expiryDate: { $gt: new Date() }
    };

    return await NoticeModel.find(query).sort({ createdAt: -1 });
  }
}
