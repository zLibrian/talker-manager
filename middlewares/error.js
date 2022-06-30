module.exports = (err, req, res, _next) => {
  const errorMap = {
    TALKER_NOT_FOUND: { code: 404, message: 'Pessoa palestrante não encontrada' },
  };
  const { code, message } = errorMap[err.message];
  res.status(code).json({ message });
};