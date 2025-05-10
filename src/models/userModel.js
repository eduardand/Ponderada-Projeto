// const db = require('../config/db');

class Usuario {
  static async getAll() {
    const result = await db.query('SELECT * FROM usuario');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM Usuario WHERE id_usuario = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      `INSERT INTO Usuario (nome_completo, cpf, email, data_nascimento, senha, genero, cidade, estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [data.nome_completo, data.cpf, data.email, data.data_nascimento, data.senha, data.genero, data.cidade, data.estado]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      `UPDATE Usuario SET nome_completo = $1, cpf = $2, email = $3, data_nascimento = $4,
       senha = $5, genero = $6, cidade = $7, estado = $8 WHERE id_usuario = $9 RETURNING *`,
      [data.nome_completo, data.cpf, data.email, data.data_nascimento, data.senha, data.genero, data.cidade, data.estado, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM Usuario WHERE id_usuario = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Usuario;
