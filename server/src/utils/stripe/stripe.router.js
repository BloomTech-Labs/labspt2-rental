import { Router } from 'express';
import {
  render,
  subscribe,
  updateUsage,
  updateCC,
  singleCharge,
  getSubscription
} from './stripe.controllers';

const router = Router();

router.get('/', render);
router.post('/subscribe', subscribe);
router.post('/updateUsage', updateUsage);
router.post('/updateCC', updateCC);
router.post('/charge', singleCharge);
router.get('/subscription', getSubscription);

export default router;
