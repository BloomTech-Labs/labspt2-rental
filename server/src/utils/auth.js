import config from '../config';
import { User } from '../resources/user/user.model';
import jwt from 'jsonwebtoken';

export const newToken = user => {
  return jwt.sign({ id: user._id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const register = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    let err = { errmsg: 'Email and password required' };
    return res.status(400).send({ err });
  }

  if (!req.body.firstName || !req.body.lastName) {
    let err = { errmsg: 'First and last name required' };
    return res.status(400).send({ err });
  }

  if (!req.body.username) {
    let err = { errmsg: 'Username required' };
    return res.status(400).send({ err });
  }

  try {
    // check if username or email exist
    const usernameCheck = await User.findOne({
      username: req.body.username
    }).exec();
    console.log('usernameCheck', usernameCheck);
    // comes back empty
  } catch (err) {
    console.log('usernameCheck err', err);
  }

  try {
    // Right now, what we have is okay, but we need to do a check
    // to see if the user already exists and throw appropriate status code
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    let err = new Error('A valid email and password are required');
    err.statusCode = 400;
    next(err);
  }

  const invalid = 'Invalid email and password combination';

  try {
    const user = await User.findOne({ email: req.body.email })
      .select('email password')
      .exec();

    if (!user) {
      let err = new Error(invalid);
      err.statusCode = 401;
      throw err;
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      let err = new Error(invalid);
      err.statusCode = 401;
      throw err;
    }

    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (err) {
    next(err);
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    let err = new Error('Invalid token');
    err.statusCode = 401;
    next(err);
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    let err = new Error('Token not authorized');
    err.statusCode = 401;
    next(err);
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    let err = new Error('User not authorized');
    err.statusCode = 401;
    next(err);
  }

  req.user = user;
  next();
};
