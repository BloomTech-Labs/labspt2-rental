import { Router } from 'express';
import {
  render,
  subscribe,
  updateUsage,
  updateCC,
  singleCharge
} from './stripe.controllers';

const router = Router();

router.get('/', render);
router.post('/subscribe', subscribe);
router.post('/updateUsage', updateUsage);
router.post('/updateCC', updateCC);
router.post('/charge', singleCharge);

export default router;
