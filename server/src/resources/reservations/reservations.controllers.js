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
          from: 'properties', // Mongo pluralizes the collection name
          foreignField: '_id',
          as: 'property'
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

  count = (req, res, next) => {
    return this.countMine(req, res, next);
  };
}

const controllers = new ReservationControllers(Reservation);

export { controllers };
