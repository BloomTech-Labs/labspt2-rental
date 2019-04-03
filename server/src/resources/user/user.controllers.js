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

export const updatePassword = async (req, res, next) => {
  try {
    const password = await User.findById(req.user._id)
      .select('password')
      .lean()
      .exec();

    console.log('req pass', req.body.password, 'user pass', password)

    // const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    //   new: true
    // })
    //   .select('-password')
    //   .lean()
    //   .exec();

    res.status(200).json({ data: password });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

export const controllers = {
  me,
  updateMe,
  updatePassword
};
