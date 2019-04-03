import { Router } from 'express';
import { controllers } from './employee.controllers';

const router = Router();



router
  .route('/')
  .get(controllers.getEmployees)
  .post(controllers.createOne)

router
  .route('/num')
  .get(controllers.getNumberEmployees)

router
  .route('/search')
  .get(controllers.searchAll)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
