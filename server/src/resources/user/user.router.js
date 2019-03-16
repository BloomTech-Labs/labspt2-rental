import { Router } from 'express';
import { controllers } from './user.controllers';
import { login, register, protect } from '../../utils/auth';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', controllers.me);
router.put('/me', controllers.updateMe);

export default router;
