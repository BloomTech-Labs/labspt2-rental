import express from 'express';
import { controllers } from './billingPlan.controllers';

const { Router } = express;
const router = Router();

router.route('/').get(controllers.getMany);

router.route('/:id').get(controllers.getOne);

