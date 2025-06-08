const TarefaModel = require('../models/tarefa');

class TarefaService {
  static async criarTarefa(dados) {
    if (!dados.user_id) {
      throw new Error('ID do usuário é obrigatório');
    }
    if (!dados.title_tasks || typeof dados.title_tasks !== 'string' || dados.title_tasks.trim() === '') {
      throw new Error('Título da tarefa é obrigatório');
    }

    return await TarefaModel.criar({
      title_tasks: dados.title_tasks,
      description_tasks: dados.description_tasks,
      status: dados.status || 'Pendente',
      priority: dados.priority || 'Média',
      user_id: dados.user_id,
      team_id: dados.team_id,
      project_id: dados.project_id,
      label_id: dados.label_id,
      deadline: dados.deadline
    });
  }

  static async listarTarefas(userId = null) {
    const tarefas = await TarefaModel.listarTodas();
    if (userId) {
      return tarefas.filter(tarefa => tarefa.user_id === parseInt(userId));
    }
    return tarefas;
  }

  static async buscarTarefasDoUsuario(userId) {
    if (!userId) {
      throw new Error('ID do usuário é obrigatório para buscar tarefas');
    }
    return await this.listarTarefas(userId);
  }

  static async buscarPorId(id, userId) {
    const tarefa = await TarefaModel.buscarPorId(id);
    if (!tarefa) {
      throw new Error('Tarefa não encontrada');
    }
    if (userId && tarefa.user_id !== parseInt(userId)) {
      throw new Error('Sem permissão para acessar esta tarefa');
    }
    return tarefa;
  }

  static async atualizarTarefa(id, dados) {
    try {
        return await TarefaModel.atualizar(id, dados);
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        throw error;
    }
}

  static async excluirTarefa(id, userId) {
    const tarefa = await TarefaModel.buscarPorId(id);
    if (!tarefa) {
      throw new Error('Tarefa não encontrada');
    }
    if (userId && tarefa.user_id !== parseInt(userId)) {
      throw new Error('Sem permissão para excluir esta tarefa');
    }
    return await TarefaModel.delete(id);
  }
}

module.exports = TarefaService;

