import mongoose, { Schema, Document } from 'mongoose';

export interface INotice extends Document {
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  targetBatchId?: mongoose.Types.ObjectId; // If null, global notice
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  expiryDate?: Date;
}

const noticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    targetBatchId: { type: Schema.Types.ObjectId, ref: 'Batch' },
    priority: { 
      type: String, 
      enum: ['LOW', 'MEDIUM', 'HIGH'], 
      default: 'LOW' 
    },
    expiryDate: { type: Date }
  },
  { timestamps: true }
);

export const NoticeModel = mongoose.model<INotice>('Notice', noticeSchema);
