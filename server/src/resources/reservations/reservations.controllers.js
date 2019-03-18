import { BaseController } from '../../utils/BaseController';
import { Reservation } from './reservations.model';

class ReservationControllers extends BaseController {
  constructor(mongooseModel) {
    const lookup = [
      {
        $lookup: {
          localField: 'property',
          from: 'properties',
          foreignField: '_id',
          as: 'property'
        }
      },
      {
        $lookup: {
          localField: 'guest',
          from: 'users',
          foreignField: '_id',
          as: 'guest'
        }
      }
    ];

    const search = [
      'property.name',
      'property.address1',
      'property.address2',
      'property.city',
      'property.state',
      'guest.lastName',
      'guest.firstName',
      '_id'
    ];

    super(mongooseModel, { lookup, search });
    this.mongooseModel = mongooseModel;
  }
}

const controllers = new ReservationControllers(Reservation);

export { controllers };
