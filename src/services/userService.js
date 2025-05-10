// services/userService.js

const db = require('../config/db');

// Função para obter todos os usuários
const getAllUsers = async () => {
  try {
    const result = await db.query('SELECT * FROM usuario');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter usuários: ' + error.message);
  }
};

// Função para obter um usuário por ID
const getUserById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter usuário: ' + error.message);
  }
};

// Função para criar um novo usuário
const createUser = async (nome_completo, cpf, email, data_nascimento, senha, genero, cidade, estado) => {
  try {
    const result = await db.query(
      'INSERT INTO usuario (nome_completo, cpf, email, data_nascimento, senha, genero, cidade, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [nome_completo, cpf, email, data_nascimento, senha, genero, cidade, estado]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

// Função para atualizar um usuário por ID
const updateUser = async (id_usuario, nome_completo, cpf, email, data_nascimento, senha, genero, cidade, estado) => {
  try {
    const result = await db.query(
      'UPDATE usuario SET nome_completo = $1, cpf = $2, email = $3, data_nascimento = $4, senha = $5, genero = $6, cidade = $7, estado = $8 WHERE id_usuario = $9 RETURNING *',
      [nome_completo, cpf, email, data_nascimento, senha, genero, cidade, estado, id_usuario]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

// Função para deletar um usuário por ID
const deleteUser = async (id_usuario) => {
  try {
    const result = await db.query('DELETE FROM usuario WHERE id_usuario = $1 RETURNING *', [id_usuario]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar usuário: ' + error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
