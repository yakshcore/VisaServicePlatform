import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  email: string;
  phone: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name:  { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAdmin>('Admin', AdminSchema);
