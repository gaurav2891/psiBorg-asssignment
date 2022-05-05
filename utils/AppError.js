class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message;
    this.statusCode = statusCode || 400;
    this.status = "failed";
  }
}

module.exports = AppError;
