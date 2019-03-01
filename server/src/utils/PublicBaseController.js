export class PublicBaseController {
  constructor(mongooseModel) {
    this.mongooseModel = mongooseModel
  }

  createOne = async (req, res, next) => {
    try {
      const doc = await this.mongooseModel.create({ ...req.body })
      res.status(201).json({ success: true, data: doc })
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  getMany = async (req, res, next) => {
    try {
      const docs = await this.mongooseModel
        .find({})
        .lean()
        .exec()

      res.status(200).json({ success: true, data: docs })
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  getOne = async (req, res, next) => {
    try {
      const doc = await this.mongooseModel
        .findOne({ _id: req.params.id })
        .lean()
        .exec()

      if (!doc) {
        const error = new Error('Item not found')
        error.statusCode = 404
        throw error
      }

      return res.status(200).json({ success: true, data: doc })
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  updateOne = async (req, res, next) => {
    try {
      const updatedDoc = await this.mongooseModel
        .findOneAndUpdate(
          {
            _id: req.params.id
          },
          req.body,
          { new: true }
        )
        .lean()
        .exec()

      if (!updatedDoc) {
        const error = new Error('Item not updated')
        error.statusCode = 400
        throw error
      }

      return res.status(200).json({ success: true, data: updatedDoc })
    } catch (e) {
      next(e)
    }
  }

  removeOne = async (req, res, next) => {
    try {
      const removed = await this.mongooseModel.findOneAndRemove({
        _id: req.params.id
      })

      if (!removed) {
        const error = new Error('Item not deleted')
        error.statusCode = 400
        throw error
      }

      return res.status(200).json({ success: true, data: removed })
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  destroy = async (req, res) => {
    const { key } = req.params

    if (key === 'toopowerful') {
      this.mongooseModel
        .remove({})
        .then(() => res.status(200).json({ success: true }))
        .catch(() => res.status(400).json({ success: false }))
    } else {
      return res.status(401).json({ success: false, message: 'Sorry bud!' })
    }
  }
}
