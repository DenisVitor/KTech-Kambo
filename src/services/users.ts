import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService {
  static async findAll() {
    return User.find({}, 'name email avatar');
  }

  static async findById(id: string) {
    return User.findById(id);
  }

  static async findByEmail(email: string) {
    return User.findOne({ email });
  }

 static async create(data: Partial<IUser>) {
  const user = new User(data as IUser);
  await user.save();
  return user;
}

  static async update(id: string, data: Partial<IUser>) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id: string) {
    return User.findByIdAndDelete(id);
  }

  static async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  static generateToken(user: IUser) {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
  }
}
