import { Router } from 'express';
import { login, register } from '../../utils/auth';
import { controllers } from './user.controllers';
const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/reset', controllers.verifyToken);
router.put('/updateByEmail', controllers.updateByEmail);
router.post('/forgot', controllers.sendResetEmail);

export default router;
