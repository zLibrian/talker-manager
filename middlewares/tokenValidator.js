module.exports = (req, res, next) => {
 const { authorization } = req.headers;
  if (!authorization) throw Error('TOKEN_NOT_FOUND');
  if (authorization.length < 16) throw Error('INVALID_TOKEN');
  next();
};