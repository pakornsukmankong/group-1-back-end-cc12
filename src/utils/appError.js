module.exports = class AppError extends Error {
  //Error is build in Fn
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}
