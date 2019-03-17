import _ from 'lodash';

export class BaseController {
  constructor(mongooseModel, populate) {
    this.mongooseModel = mongooseModel;
    this.populate = populate;
  }

  createOne = async (req, res, next) => {
    let createdBy;
    _.isNil(req.user) ? (createdBy = 'default') : (createdBy = req.user._id);

    try {
      const doc = await this.mongooseModel.create({ ...req.body, createdBy });
      res.status(201).json({ data: doc });
    } catch (e) {
      next(e);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const doc = await this.mongooseModel
        .findOne({ createdBy: req.user._id, _id: req.params.id })
        .lean()
        .populate(this.populate)
        .exec();

      if (!doc) {
        const error = new Error('This item does not seem to exist');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ data: doc });
    } catch (e) {
      console.error(e);
      next(e);
    }
  };

  getMany = async (req, res, next) => {
    let skip, limit, query, sort;

    if (req.query.sort) {
      let order = -1;
      if (req.query.sort.substring(0, 1) === '-') {
        order = 1;
        req.query.sort = req.query.sort.substr(1);
      }

      sort = { [req.query.sort]: order };
    }

    if (req.query.skip) {
      skip = +req.query.skip;
    }

    if (req.query.limit) {
      limit = +req.query.limit;
    }

    if (req.query.filter) {
      query = JSON.parse(req.query.filter);
    }

    if (req.query.search) {
      query = { $text: { $search: req.query.search } };
    }

    try {
      const docs = await this.mongooseModel
        .find({ ...query, createdBy: req.user._id })
        .populate(this.populate)
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .exec();

      res.status(200).json({ data: docs });
    } catch (e) {
      console.error(e);
      next(e);
    }
  };

  updateOne = async (req, res, next) => {
    try {
      const updatedDoc = await this.mongooseModel
        .findOneAndUpdate(
          {
            createdBy: req.user._id,
            _id: req.params.id
          },
          req.body,
          { new: true }
        )
        .lean()
        .exec();

      if (!updatedDoc) {
        throw new Error('Something went wrong updating this item');
      }

      res.status(200).json({ data: updatedDoc });
    } catch (e) {
      console.error(e);
      next(e);
    }
  };

  removeOne = async (req, res, next) => {
    try {
      const removed = await this.mongooseModel.findOneAndRemove({
        createdBy: req.user._id,
        _id: req.params.id
      });

      if (!removed) {
        throw new Error('Something went wrong removing this item');
      }

      return res.status(200).json({ data: removed });
    } catch (e) {
      console.error(e);
      next(e);
    }
  };

  getModel = async () => {
    console.log('model: ', this.mongooseModel);
  };

  destroy = async (req, res) => {};
}
