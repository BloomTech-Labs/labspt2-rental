import { Router } from 'express';
import { controllers } from './user.controllers';

const router = Router();

router.get('/me', controllers.me);
router.put('/me', controllers.updateMe);

export default router;
