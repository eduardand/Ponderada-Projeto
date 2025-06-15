const Joi = require('joi');

const projetoSchema = Joi.object({
  name_projects: Joi.string().min(3).max(100).required().messages({
    'string.base': 'O nome do projeto deve ser um texto.',
    'string.empty': 'O nome do projeto é obrigatório.',
    'string.min': 'O nome do projeto deve ter no mínimo {#limit} caracteres.',
    'string.max': 'O nome do projeto deve ter no máximo {#limit} caracteres.',
    'any.required': 'O campo nome do projeto é obrigatório.'
  }),

  description_projects: Joi.string().allow('', null).max(500).messages({
    'string.base': 'A descrição deve ser um texto.',
    'string.max': 'A descrição pode ter no máximo {#limit} caracteres.'
  }),

  color_projects: Joi.string().allow('', null).max(30).messages({
    'string.base': 'A cor deve ser um texto.',
    'string.max': 'A cor pode ter no máximo {#limit} caracteres.'
  })
}).unknown(true);

module.exports = projetoSchema;
