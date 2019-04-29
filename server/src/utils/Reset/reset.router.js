import { Router } from 'express';
import { controllers } from './reset.controllers';
const router = Router();

router.post('/verify', controllers.verifyResetToken);
router.put('/updateByEmail', controllers.updateByEmail);
router.post('/forgot', controllers.sendResetEmail);

export default router;
