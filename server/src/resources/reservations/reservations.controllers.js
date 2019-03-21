import { BaseController } from '../../utils/BaseController';
import { Reservation } from './reservations.model';

class ReservationControllers extends BaseController {
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }

  searchAll = (req, res, next) => {
    // Other collections to join
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

    // Properties to search
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

    return this.search(req, res, next, { lookup, search });
  };
}

const controllers = new ReservationControllers(Reservation);

export { controllers };
