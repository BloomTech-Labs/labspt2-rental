import { Router } from 'express';
import { controllers } from './property.controllers';

const router = Router();

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne);

  router.route('/count').get(controllers.count)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
