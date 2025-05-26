// models/Tarefa.js
const db = require('../config/db');

class Tarefa {
  static async getAll() {
    const result = await db.query('SELECT * FROM tarefas');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM tarefas WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create({ nome, descricao }) {
    const result = await db.query(
      'INSERT INTO tarefas (nome, descricao) VALUES ($1, $2) RETURNING *',
      [nome, descricao]
    );
    return result.rows[0];
  }

  static async update(id, { nome, descricao, status }) {
    const result = await db.query(
      `UPDATE tarefas SET nome = $1, descricao = $2, status = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4 RETURNING *`,
      [nome, descricao, status, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM tarefas WHERE id = $1 RETURNING *', [id]);
    return result.rows[0]; // retorna a tarefa excluída, ou null se não encontrada
  }
}

module.exports = Tarefa;
