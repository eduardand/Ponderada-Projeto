const pool = require("../config/database");
const projetoSchema = require("../schemas/projetoSchema");

class ProjetoModel {
  static async findAll() {
    const query = `
      SELECT * FROM projects 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async criar(data) {
    const { error } = projetoSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const { name_projects, description_projects } = data;

    const query = `
    INSERT INTO projects (name_projects, description_projects)
    VALUES ($1, $2)
    RETURNING *`;
    const result = await pool.query(query, [
      name_projects,
      description_projects,
    ]);
    return result.rows[0];
  }

  static async atualizar(id, dados) {
    const query = `
      UPDATE projects 
      SET 
        name_projects = $1,
        description_projects = $2,
        color_projects = $3
      WHERE id = $4 AND is_deleted = FALSE
      RETURNING *`;

    const valores = [
      dados.name_projects,
      dados.description_projects,
      dados.color_projects,
      id,
    ];

    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
  }

  static async delete(id) {
    const query = `DELETE FROM projects WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async buscarPorId(id) {
    const query = `
      SELECT * FROM projects 
      WHERE id = $1 AND is_deleted = FALSE
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}
module.exports = ProjetoModel;
