const pool = require("../config/database");
const bcrypt = require("bcrypt");
const usuarioSchema = require("../schemas/usuarioSchema");

class UsuarioModel {
  static async findAll() {
    const query = `
          SELECT * FROM users 
          ORDER BY created_at DESC
        `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async buscarPorEmail(email) {
    const client = await pool.connect();
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const result = await client.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  static async validarSenha(senha, hash) {
    return await bcrypt.compare(senha, hash);
  }

  static async create(data) {
    const { error } = usuarioSchema.validate(data);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const { name_users, email, password } = data;

    const query = `
    INSERT INTO users (name_users, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`;
    const result = await pool.query(query, [name_users, email, password]);
    return result.rows[0];
  }

  static async atualizar(id, dados) {
    const { name_users, email, password } = dados;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : dados.password;
    const query = `
          UPDATE users 
          SET 
            name_users = $1,
            email = $2,
            password = $3
          WHERE id = $4
          RETURNING *
        `;
    const valores = [name_users, email, hashedPassword, id];
    const resultado = await pool.query(query, valores);
    if (!resultado.rows[0]) {
      throw new Error("Usuário não encontrado");
    }
    return resultado.rows[0];
  }

  static async delete(id) {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    if (!result.rows[0]) {
      throw new Error("Usuário não encontrado");
    }
    return result.rows[0];
  }
}

module.exports = UsuarioModel;
