import mongoose, { Schema, Document } from 'mongoose';

export interface IResult extends Document {
  studentId: mongoose.Types.ObjectId;
  subject: string;
  marks: number;
  totalMarks: number;
  term: string;
}

const resultSchema = new Schema<IResult>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    marks: { type: Number, required: true, min: 0, max: 100 },
    totalMarks: { type: Number, default: 100 },
    term: { type: String, required: true }
  },
  { timestamps: true }
);

export const ResultModel = mongoose.model<IResult>('Result', resultSchema);
