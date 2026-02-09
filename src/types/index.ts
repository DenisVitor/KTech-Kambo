import { Request } from 'express';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  age?: number;
  city?: string;
  job?: string;
  phone?: string;
  role: 'user' | 'admin';
}

export interface UserPublic {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface UserPrivate extends Omit<UserPublic, '_id'> {
  age?: number;
  city?: string;
  job?: string;
  phone?: string;
  role: 'user' | 'admin';
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  age?: number;
  city?: string;
  job?: string;
  phone?: string;
  role?: 'user' | 'admin';
}

export interface UpdateUserDto {
  name?: string;
  avatar?: string;
  age?: number;
  city?: string;
  job?: string;
  phone?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: Omit<User, 'password'>;
  token: string;
}
