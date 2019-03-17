import { BaseController } from '../../utils/BaseController';
import { Reservation } from './reservations.model';

class ReservationControllers extends BaseController {
  constructor(mongooseModel) {
    super(mongooseModel, ['property', 'guest']);
    this.mongooseModel = mongooseModel;
  }
}

const controllers = new ReservationControllers(Reservation);

export { controllers };
