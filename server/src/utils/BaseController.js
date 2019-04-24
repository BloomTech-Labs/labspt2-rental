import _ from 'lodash';

export class BaseController {
  constructor(mongooseModel) {
    this.mongooseModel = mongooseModel;
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
    let userId;

    userId = req.user.createdBy ? req.user.createdBy : req.user._id;

    try {
      const doc = await this.mongooseModel
        .findOne({ createdBy: userId, _id: req.params.id })
        .select('-password')
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

  getMany = async (req, res, next, query = null) => {
    let filter, sort, skip, limit, userId;

    userId = req.user.createdBy ? req.user.createdBy : req.user._id;

    if (req.query.filter) {
      filter = JSON.parse(req.query.filter);
    }

    if (query) {
      filter = { ...filter, ...query };
    }

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

    try {
      const docs = await this.mongooseModel
        .find({ createdBy: userId, ...filter })
        .select('-password')
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .exec();

      res.status(200).json({ data: docs });
    } catch (e) {
      next(e);
    }
  };

  search = async (req, res, next, opts = {}) => {
    const { lookup, search, filter } = opts;
    let userId;

    userId = req.user.createdBy ? req.user.createdBy : req.user._id;

    let pipeline = [{ $project: { password: false } }];

    if (lookup && lookup.length) {
      pipeline.push(...lookup);
    }

    pipeline.push({ $match: { createdBy: userId } });

    if (filter) {
      pipeline.push({ $match: filter });
    }

    if (req.query.filter) {
      const filter = { $match: JSON.parse(req.query.filter) };
      pipeline.push(filter);
    }

    if (req.query.search && search && search.length) {
      const match = new RegExp(req.query.search, 'i');

      const searchFields = search.reduce(
        ($match, field) => {
          $match['$match']['$or'].push({ [field]: match });
          return $match;
        },
        { $match: { $or: [] } }
      );

      pipeline.push(searchFields);
    }

    if (lookup && lookup.length) {
      const unwindFields = lookup.map(l => ({
        $unwind: '$' + l['$lookup'].as
      }));
      pipeline.push(...unwindFields);
    }

    if (req.query.sort) {
      let order = -1;
      if (req.query.sort.substring(0, 1) === '-') {
        order = 1;
        req.query.sort = req.query.sort.substr(1);
      }

      const sort = { [req.query.sort]: order };

      pipeline.push({ $sort: sort });
    }

    if (req.query.skip) {
      const skip = +req.query.skip;
      pipeline.push({ $skip: skip });
    }

    if (req.query.limit) {
      const limit = +req.query.limit;
      pipeline.push({ $limit: limit });
    }

    this.mongooseModel.aggregate(pipeline, (err, docs) => {
      if (err) {
        return next(err);
      }

      res.status(200).json({ data: docs });
    });
  };

  updateOne = async (req, res, next) => {
    let userId;

    userId = req.user.createdBy ? req.user.createdBy : req.user._id;

    try {
      const updatedDoc = await this.mongooseModel
        .findOneAndUpdate(
          {
            createdBy: userId,
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
    let userId;

    userId = req.user.createdBy ? req.user.createdBy : req.user._id;

    try {
      const removed = await this.mongooseModel.findOneAndRemove({
        createdBy: userId,
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

  countMine = async (req, res, next) => {
    let filter = {};
    let userId;

    userId = req.user.createdBy ? req.user.createdBy : req.user._id;

    if (req.query.filter) {
      filter = JSON.parse(req.query.filter);
    }

    try {
      this.mongooseModel.countDocuments(
        { createdBy: userId, ...filter },
        (err, count) => {
          if (err) {
            const error = new Error('Error counting documents');
            error.statusCode = 404;
            throw error;
          } else {
            res.status(200).json({ count });
          }
        }
      );
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
