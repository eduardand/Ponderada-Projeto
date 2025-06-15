const Joi = require('joi');

const timeProjetoSchema = Joi.object({
  team_id: Joi.number().integer().required().messages({
    'number.base': 'O ID do time deve ser um número.',
    'any.required': 'O campo team_id é obrigatório.'
  }),

  project_id: Joi.number().integer().required().messages({
    'number.base': 'O ID do projeto deve ser um número.',
    'any.required': 'O campo project_id é obrigatório.'
  })
});

module.exports = timeProjetoSchema;
