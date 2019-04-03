import { User } from './user.model';

export const me = (req, res) => {
  res.status(200).json({ data: req.user });
};

export const updateMe = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .select('-password')
      .lean()
      .exec();

    res.status(200).json({ data: user });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

export const controllers = {
  me,
  updateMe
};
