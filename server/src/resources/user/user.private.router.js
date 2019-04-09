import { Router } from 'express';
import { controllers } from './user.controllers';

const router = Router();

router.get('/me', controllers.me);
router.put('/me', controllers.updateMe);
router.put('/me/pass', controllers.updatePassword);

export default router;
