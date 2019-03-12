import BaseController from '../../utils/BaseController';
import { Reservation } from './reservations.model';

class ReservationControllers extends BaseController {
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }
}

const reservationControllers = ReservationControllers(Reservation);

export { reservationControllers };