import { Router } from 'express';
import { render, charge } from './stripe.controllers';

const router = Router();

router.get('/', render);
router.post('/charge', charge);

export default router;
