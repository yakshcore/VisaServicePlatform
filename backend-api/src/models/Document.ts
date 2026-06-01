import mongoose, { Document, Schema } from 'mongoose';

export type DocumentStatus = 'pending' | 'approved' | 'rejected';

export interface IDocument extends Document {
  application: mongoose.Types.ObjectId;
  requirementName: string;
  url: string;
  publicId: string;
  status: DocumentStatus;
  rejectionReason: string;
  uploadedAt: Date;
  reviewedAt: Date | null;
}

const DocumentSchema = new Schema<IDocument>(
  {
    application: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    requirementName: { type: String, required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    rejectionReason: { type: String, default: '' },
    reviewedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IDocument>('Document', DocumentSchema);
