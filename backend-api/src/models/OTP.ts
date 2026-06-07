import mongoose, { Document, Schema } from 'mongoose';

export interface IOTP extends Document {
  email: string;
  otp: string;
  role: 'user' | 'admin';
  expiresAt: Date;
  verified: boolean;
}

const OTPSchema = new Schema<IOTP>({
  email:     { type: String, required: true, lowercase: true },
  otp:       { type: String, required: true },
  role:      { type: String, enum: ['user', 'admin'], default: 'user' },
  expiresAt: { type: Date, required: true },
  verified:  { type: Boolean, default: false },
});

OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IOTP>('OTP', OTPSchema);
