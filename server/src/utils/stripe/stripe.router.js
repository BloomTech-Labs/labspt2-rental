import { Router } from 'express';
import { render, subscribe, updateUsage } from './stripe.controllers';

const router = Router();

router.get('/', render);
router.post('/subscribe', subscribe);
router.post('/updateUsage', updateUsage);

export default router;
