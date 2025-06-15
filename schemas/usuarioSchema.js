const Joi = require("joi");

const usuarioSchema = Joi.object({
  name_users: Joi.string().min(2).max(50).required().messages({
    "string.base": "O nome deve ser um texto.",
    "string.empty": "O nome é obrigatório.",
    "string.min": "O nome deve ter no mínimo {#limit} caracteres.",
    "string.max": "O nome deve ter no máximo {#limit} caracteres.",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Formato de email inválido.",
    "any.required": "O email é obrigatório.",
  }),

  password: Joi.string().min(6).max(100).required().messages({
    "string.min": "A senha deve ter no mínimo {#limit} caracteres.",
    "string.max": "A senha deve ter no máximo {#limit} caracteres.",
    "any.required": "A senha é obrigatória.",
  }),
});

module.exports = usuarioSchema;
