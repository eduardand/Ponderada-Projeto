const pool = require("../config/database");
const tarefaSchema = require("../schemas/tarefaSchema");

class TarefaModel {
  static async validarRelacoes(usuario_id, time_id, projeto_id) {
    if (usuario_id) {
      const usuarioExiste = await pool.query(
        "SELECT id FROM users WHERE id = $1",
        [usuario_id]
      );
      if (usuarioExiste.rows.length === 0) {
        throw new Error("Usuário não encontrado");
      }
    }

    if (time_id) {
      const timeExiste = await pool.query(
        "SELECT id FROM teams WHERE id = $1",
        [time_id]
      );
      if (timeExiste.rows.length === 0) {
        throw new Error("Time não encontrado");
      }
    }

    if (projeto_id) {
      const projetoExiste = await pool.query(
        "SELECT id FROM projects WHERE id = $1",
        [projeto_id]
      );
      if (projetoExiste.rows.length === 0) {
        throw new Error("Projeto não encontrado");
      }
    }
  }

  static async criar(dados) {
    const { error } = tarefaSchema.validate(dados);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const {
        title_tasks,
        description_tasks,
        status = "Pendente",
        priority = "Média",
        user_id,
        team_id,
        project_id,
      } = dados;

      const statusMap = {
        Pendente: "Pendente",
        pendente: "Pendente",

        "Em Andamento": "Em andamento",
        "Em andamento": "Em andamento",
        "em andamento": "Em andamento",

        Concluído: "Concluída",
        Concluída: "Concluída",
        concluído: "Concluída",
        concluída: "Concluída",
      };

      const statusFormatado = statusMap[status];
      if (!statusFormatado) {
        throw new Error(
          'Status deve ser "Pendente", "Em andamento" ou "Concluída".'
        );
      }

      const sanitizedTeamId = team_id === "" ? null : team_id;
      const sanitizedProjectId = project_id === "" ? null : project_id;

      await this.validarRelacoes(user_id, sanitizedTeamId, sanitizedProjectId);

      const queryTarefa = `
      INSERT INTO tasks (
        title_tasks, description_tasks, status, priority,
        user_id, team_id, project_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;

      const valores = [
        title_tasks,
        description_tasks,
        statusFormatado,
        priority,
        user_id,
        sanitizedTeamId,
        sanitizedProjectId,
      ];

      const resultadoTarefa = await client.query(queryTarefa, valores);
      const tarefa = resultadoTarefa.rows[0];

      await client.query("COMMIT");
      return tarefa;
    } catch (erro) {
      await client.query("ROLLBACK");
      throw erro;
    } finally {
      client.release();
    }
  }

  static async listarTodas() {
    const query = `
      SELECT 
        t.*,
        u.name_users,
        tm.name_teams,
        p.name_projects
      FROM tasks t
      LEFT JOIN users u ON t.user_id = u.id
      LEFT JOIN teams tm ON t.team_id = tm.id
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE t.is_deleted = FALSE
      ORDER BY t.id DESC`;

    const resultado = await pool.query(query);
    return resultado.rows;
  }

  static async atualizar(id, dados) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      if (dados.team_id || dados.project_id) {
        await this.validarRelacoes(
          dados.user_id,
          dados.team_id,
          dados.project_id
        );
      }

      const query = `
            UPDATE tasks 
            SET 
                title_tasks = COALESCE($1, title_tasks),
                description_tasks = COALESCE($2, description_tasks),
                status = COALESCE($3, status),
                priority = COALESCE($4, priority),
                team_id = COALESCE($5, team_id),
                project_id = COALESCE($6, project_id),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $7 
            RETURNING *
        `;

      const values = [
        dados.title_tasks,
        dados.description_tasks,
        dados.status,
        dados.priority,
        dados.team_id,
        dados.project_id,
        id,
      ];

      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        throw new Error("Tarefa não encontrada");
      }

      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
  static async buscarPorId(id) {
    const client = await pool.connect();
    try {
      const query = `
            SELECT 
                t.*,
                p.name_projects as project_name,
                tm.name_teams as team_name
            FROM tasks t
            LEFT JOIN projects p ON t.project_id = p.id
            LEFT JOIN teams tm ON t.team_id = tm.id
            WHERE t.id = $1 AND t.is_deleted = FALSE
        `;

      const result = await client.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao buscar tarefa:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  static async delete(id) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
            UPDATE tasks 
            SET is_deleted = TRUE, 
                updated_at = CURRENT_TIMESTAMP 
            WHERE id = $1 AND is_deleted = FALSE 
            RETURNING *
        `;

      const result = await client.query(query, [id]);

      if (result.rows.length === 0) {
        throw new Error("Tarefa não encontrada");
      }

      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = TarefaModel;
