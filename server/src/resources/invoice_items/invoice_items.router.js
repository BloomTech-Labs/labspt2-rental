import express from 'express';
import { controllers } from './invoice_items.controllers';

const { Router } = express;
const router = Router();

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
