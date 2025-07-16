const { NotFoundError, ValidationError } = require('../../utils/errors');

describe('Error Utility Functions', () => {
  test('NotFoundError should have correct properties', () => {
    const notFoundError = new NotFoundError();
    expect(notFoundError.name).toBe('NotFoundError');
    expect(notFoundError.statusCode).toBe(404);
    expect(notFoundError.message).toBe('Resource not found');

    const customErrorMessage = 'My custom not found message';
    const customNotFoundError = new NotFoundError(customErrorMessage);
    expect(customNotFoundError.message).toBe(customErrorMessage);
  });

  test('ValidationError should have correct properties', () => {
    const validationError = new ValidationError();
    expect(validationError.name).toBe('ValidationError');
    expect(validationError.statusCode).toBe(400);
    expect(validationError.message).toBe('Validation failed');

    const customErrorMessage = 'My custom validation message';
    const customValidationError = new ValidationError(customErrorMessage);
    expect(customValidationError.message).toBe(customErrorMessage);
  });
});