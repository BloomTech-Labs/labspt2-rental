import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const register = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    let err = new Error('Email and password required')
    err.statusCode = 400
    next(err)
  }

  try {
    // Right now, what we have is okay, but we need to do a check
    // to see if the user already exists and throw appropriate status code
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (err) {
    err.statusCode = 500
    next(err)
  }
}

export const login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    let err = new Error('A valid email and password are required')
    err.statusCode = 400
    next(err)
  }

  const invalid = 'Invalid email and password combination'

  try {
    const user = await User.findOne({ email: req.body.email })
      .select('email password')
      .exec()

    if (!user) {
      let err = new Error(invalid)
      err.statusCode = 401
      throw err
    }

    const match = await user.checkPassword(req.body.password)

    if (!match) {
      let err = new Error(invalid)
      err.statusCode = 401
      throw err
    }

    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (err) {
      next(err)
  }
}

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    let err = new Error('Invalid token')
    err.statusCode = 401
    next(err)
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    let err = new Error('Token not authorized')
    err.statusCode = 401
    next(err)
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec()

  if (!user) {
    let err = new Error('User not authorized')
    err.statusCode = 401
    next(err)
  }

  req.user = user
  next()
}