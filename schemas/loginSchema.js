const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    'string.email': 'O "email" deve ter o formato "email@email.com"',
    'any.required': 'O campo "email" é obrigatório',
  }),
  password: joi.string().required().min(6).messages({
    'string.min': 'O "password" deve ter pelo menos 6 caracteres',
    'any.required': 'O campo "password" é obrigatório',
  }),
});

module.exports = loginSchema;