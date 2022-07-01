const joi = require('joi');

module.exports = (err, req, res, next) => {
  const isJoiError = joi.isError(err);
  const joiErrorStatusCode = 400;
  if (isJoiError) {
    return res.status(joiErrorStatusCode).json({ message: err.message });
  }
  next(err);
};