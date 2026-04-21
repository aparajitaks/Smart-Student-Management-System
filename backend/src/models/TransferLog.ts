import mongoose, { Schema, Document } from 'mongoose';

export interface ITransferLog extends Document {
  studentId: mongoose.Types.ObjectId;
  fromBatchId: mongoose.Types.ObjectId;
  toBatchId: mongoose.Types.ObjectId;
  transferredBy: mongoose.Types.ObjectId;
  reason?: string;
  createdAt: Date;
}

const transferLogSchema = new Schema<ITransferLog>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fromBatchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
    toBatchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
    transferredBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const TransferLogModel = mongoose.model<ITransferLog>('TransferLog', transferLogSchema);
