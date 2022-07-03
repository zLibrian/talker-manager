module.exports = (err, req, res, _next) => {
  const errorMap = {
    TALKER_NOT_FOUND: { code: 404, message: 'Pessoa palestrante não encontrada' },
    TOKEN_NOT_FOUND: { code: 401, message: 'Token não encontrado' },
    INVALID_TOKEN: { code: 401, message: 'Token inválido' },
  };
  const { code, message } = errorMap[err.message];
  return res.status(code).json({ message });
};