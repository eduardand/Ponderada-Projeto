const Joi = require('joi');

const tarefaSchema = Joi.object({
  title_tasks: Joi.string().min(3).max(100).required().messages({
    'string.base': 'O título da tarefa deve ser um texto.',
    'string.empty': 'O título da tarefa é obrigatório.',
    'string.min': 'O título da tarefa deve ter no mínimo {#limit} caracteres.',
    'string.max': 'O título da tarefa deve ter no máximo {#limit} caracteres.',
    'any.required': 'O campo título é obrigatório.'
  }),

  description_tasks: Joi.string().allow('', null).max(500).messages({
    'string.base': 'A descrição deve ser um texto.',
    'string.max': 'A descrição pode ter no máximo {#limit} caracteres.'
  }),

  status: Joi.string().valid('Pendente', 'Em Andamento', 'Concluído').default('Pendente').messages({
    'string.base': 'O status deve ser um texto.',
    'any.only': 'Status deve ser "Pendente", "Em Andamento" ou "Concluído".'
  }),

  priority: Joi.string().valid('Alta', 'Média', 'Baixa').default('Média').messages({
    'string.base': 'A prioridade deve ser um texto.',
    'any.only': 'Prioridade deve ser "Alta", "Média" ou "Baixa".'
  }),

  user_id: Joi.number().integer().required().messages({
    'number.base': 'O ID do usuário deve ser um número.',
    'any.required': 'O ID do usuário é obrigatório.'
  }),

  team_id: Joi.number().integer().allow(null).messages({
    'number.base': 'O ID do time deve ser um número.'
  }),

  project_id: Joi.number().integer().allow(null).messages({
    'number.base': 'O ID do projeto deve ser um número.'
  }),

  label_id: Joi.number().integer().allow(null).messages({
    'number.base': 'O ID da etiqueta deve ser um número.'
  })
}).unknown(true);

module.exports = tarefaSchema;
