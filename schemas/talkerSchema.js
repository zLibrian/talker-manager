const joi = require('joi').extend(require('@joi/date'));

module.exports = joi.object({
  name: joi.string().min(3).required().messages({
    'string.min': 'O "name" deve ter pelo menos 3 caracteres',
    'string.empty': 'O campo "name" é obrigatório',
    'any.required': 'O campo "name" é obrigatório',
  }),
  age: joi.number().min(18).required().messages({
    'any.required': 'O campo "age" é obrigatório',
    'number.min': 'A pessoa palestrante deve ser maior de idade',
  }),
  talk: joi.object({
    watchedAt: joi.date().format('DD/MM/YYYY').required().messages({
      'date.format': 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      'any.required': 'O campo "watchedAt" é obrigatório',
    })
    .messages({
      'any.required': 'O campo "watchedAt" é obrigatório',
    }),
    rate: joi.number().integer().max(5).min(0)
      .required()
      .messages({
        'number.base': 'O campo "rate" deve ser um inteiro de 1 à 5',
        'any.required': 'O campo "rate" é obrigatório',
        'number.integer': 'O campo "rate" deve ser um inteiro de 1 à 5',
        'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
        'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
      }),
  })
    .required()
    .messages({
      'any.required': 'O campo "talk" é obrigatório',
    }),
});