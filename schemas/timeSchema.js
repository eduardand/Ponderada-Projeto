const Joi = require('joi');

const timeSchema = Joi.object({
  name_teams: Joi.string().min(2).max(50).required().messages({
    'string.base': 'O nome do time deve ser um texto.',
    'string.empty': 'O nome do time é obrigatório.',
    'string.min': 'O nome do time deve ter no mínimo {#limit} caracteres.',
    'string.max': 'O nome do time deve ter no máximo {#limit} caracteres.',
    'any.required': 'O campo nome do time é obrigatório.'
  })
}).unknown(true);

module.exports = timeSchema;
