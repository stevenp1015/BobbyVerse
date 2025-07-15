class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

class ValidationError extends ApiError {
  constructor(message = 'Validation failed') {
    super(message, 400);
  }
}

class DatabaseError extends ApiError {
  constructor(message = 'Database error') {
    super(message, 500);
  }
}

module.exports = {
  ApiError,
  NotFoundError,
  ValidationError,
  DatabaseError,
};