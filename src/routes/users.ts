import { Router } from 'express';
import { UserController } from '../controllers/users';
import { auth, isAdminOrSelf } from '../middleware/auth';
import { validateUser } from '../middleware/validation';

const router = Router();

router.post('/login', UserController.login);
router.post('/register', validateUser, UserController.create);

router.get('/', auth, UserController.getAll);
router.get('/:id', auth, UserController.getById);
router.put('/:id', auth, isAdminOrSelf, validateUser, UserController.update);
router.delete('/:id', auth, isAdminOrSelf, UserController.delete);

export default router;
