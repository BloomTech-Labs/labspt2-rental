import { Router } from 'express';
import { render, subscribe, updateUsage, updateCC } from './stripe.controllers';

const router = Router();

router.get('/', render);
router.post('/subscribe', subscribe);
router.post('/updateUsage', updateUsage);
router.post('/updateCC', updateCC);

export default router;
