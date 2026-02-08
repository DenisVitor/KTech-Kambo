import { Request, Response } from "express";
import { UserService } from "../services/users";

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export class UserController {
  static async getAll(req: AuthRequest, res: Response) {
    const users = await UserService.findAll();
    res.json(users);
  }

  static async getById(req: AuthRequest, res: Response) {
    const user = await UserService.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const { password, ...userWithoutPassword } = user.toObject();
    res.json(userWithoutPassword);
  }

  static async create(req: AuthRequest, res: Response) {
    const user = await UserService.create(req.body);
    const { password, ...userWithoutPassword } = user.toObject();
    const token = UserService.generateToken(user);

    res.status(201).json({
      user: userWithoutPassword,
    });
  }

  static async update(req: AuthRequest, res: Response) {
    const user = await UserService.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const { password, ...userWithoutPassword } = user.toObject();
    res.json(userWithoutPassword);
  }

  static async delete(req: AuthRequest, res: Response) {
    await UserService.delete(req.params.id);
    res.json({ message: "Usuário deletado" });
  }

  static async login(req: AuthRequest, res: Response) {
    const { email, password } = req.body;
    const user = await UserService.findByEmail(email);

    if (
      !user ||
      !(await UserService.comparePassword(password, user.password))
    ) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = UserService.generateToken(user);
    res.json({ token });
  }
}
