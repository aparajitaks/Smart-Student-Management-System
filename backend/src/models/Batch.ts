import mongoose, { Schema, Document } from 'mongoose';

export interface IBatch extends Document {
  name: string;
  year: number;
  capacity: number;
  teacherId: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const batchSchema = new Schema<IBatch>(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    capacity: { type: Number, required: true, min: 1 },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const BatchModel = mongoose.model<IBatch>('Batch', batchSchema);
