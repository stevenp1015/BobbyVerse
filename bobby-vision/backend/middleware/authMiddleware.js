const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/errors');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return next(new ApiError('Unauthorized', 401));
  }

  jwt.verify(token, process.env.JWT_SECRET || 'testsecret', (err, user) => {
    if (err) {
      return next(new ApiError('Forbidden', 403));
    }
    req.user = user;
    next();
  });
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError('Forbidden', 403));
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorize,
};