module.exports = (schema) => (req, rex, next) => {
  const { error } = schema.validate(req.body);
  if (error) throw (error);
  next();
};