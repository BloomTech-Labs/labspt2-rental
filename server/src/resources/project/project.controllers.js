import { Project } from './project.model';
import { BaseController } from '../../utils/BaseController';

class ProjectControllers extends BaseController {
  // no constructor needed because default
  // https://stackoverflow.com/questions/45924326/standardjs-es6-extended-class-useless-constructor
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }

  // add custom methods if needed
}

const controllers = new ProjectControllers(Project);

export { controllers };
