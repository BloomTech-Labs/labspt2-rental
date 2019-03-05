import { Router } from 'express';
import { controllers } from './user.controllers';
import { login, register, protect } from '../../utils/auth';

const router = Router();

router.get('/me', protect, controllers.me);
router.put('/me', protect, controllers.updateMe);
router.post('/login', login);
router.post('/register', register);

export default router;
