import mongoose, { Document, Schema } from 'mongoose';

export interface IVisaFile extends Document {
  application: mongoose.Types.ObjectId;
  url: string;
  publicId: string;
  uploadedAt: Date;
}

const VisaFileSchema = new Schema<IVisaFile>(
  {
    application: { type: Schema.Types.ObjectId, ref: 'Application', required: true, unique: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IVisaFile>('VisaFile', VisaFileSchema);
