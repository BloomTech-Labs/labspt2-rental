import { Router } from 'express';
import sendMail from './sendgrid.controllers';

const router = Router();

router.post('/mail/send', sendMail);

export default router;
