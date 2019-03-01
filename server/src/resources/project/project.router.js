import { Router } from 'express';
import { controllers } from './project.controllers';

const router = Router();

router
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
