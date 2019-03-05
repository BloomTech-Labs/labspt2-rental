import BaseController from '../../utils/BaseController';
import { House } from './house.model';

class HouseControllers extends BaseController {
  // Create specific methods here
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }
}

const houseControllers = HouseControllers(House);

export { houseControllers };
