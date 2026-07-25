export class ApiError extends Error {
  public statusCode: number;
  public errors?: unknown;

  constructor(message: string, statusCode: number = 500, errors?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource Not Found') {
    super(message, 404);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = 'Bad Request', errors?: unknown) {
    super(message, 400, errors);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}
