import mongoose, { Document, Schema } from 'mongoose';

export interface ICountry extends Document {
  name: string;
  flag: string;
  description: string;
  isActive: boolean;
}

const CountrySchema = new Schema<ICountry>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    flag: { type: String, required: true },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICountry>('Country', CountrySchema);
