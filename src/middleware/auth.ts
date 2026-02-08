import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await User.findById(decoded.id).select('_id role');
    
    if (!user) return res.status(401).json({ error: 'Token inválido' });
    
    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

export const isAdminOrSelf = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const authUserId = req.user!.id;

  if (req.user!.role !== 'admin' && userId !== authUserId) {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  next();
};
