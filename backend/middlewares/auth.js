const jwt = require('jsonwebtoken');
const Users = require('../models/user');
require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;

const {
  UnauthorizedError,
  NotFoundError,
} = require('../controllers/errors');

const checkToken = async (req, res, next) => {
  const decoded = await jwt.verify(
    req.cookies.jwt,
    NODE_ENV === 'production' ? JWT_SECRET : 'secretsecretsecret',
  );
  if (!decoded) {
    return next(new UnauthorizedError('Cannot find JWT! Please sign in!'));
  }
  const user = await Users.findById(decoded);
  if (!user) {
    return next(new NotFoundError('Please sign in! Token is expired, cannot find user!'));
  }
  req.user = decoded;
  return next();
};

module.exports = {
  checkToken,
};
