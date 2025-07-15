const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/errors');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      throw new ApiError('Authentication token required', 401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        throw new ApiError('Invalid or expired token', 403);
      }
      req.user = user;
      next();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;