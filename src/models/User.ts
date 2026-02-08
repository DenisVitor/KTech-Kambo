import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  age?: number;
  city?: string;
  role: 'admin' | 'user';
  phone?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  age: Number,
  city: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  phone: String
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password') || typeof this.password !== 'string') {
    return next();
  }
  
  this.password = await bcrypt.hash(this.password as string, 10);
  next();
});

export default mongoose.model<IUser>('User', UserSchema);
