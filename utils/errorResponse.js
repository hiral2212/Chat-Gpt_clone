class errorResponse extends Error {
  //Error is object we  extend
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
module.exports = errorResponse;
