import { Router } from 'express';
import { render, subscribe } from './stripe.controllers';

const router = Router();

router.get('/', render);
router.post('/subscribe', subscribe);

export default router;
