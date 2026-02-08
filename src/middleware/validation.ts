import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  avatar: z.string().optional(),
  age: z.number().min(18).optional(),
  city: z.string().optional(),
  role: z.enum(['admin', 'user']).optional()
});

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Dados inválidos' });
  }
};
