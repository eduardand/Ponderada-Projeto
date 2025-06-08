const TarefaModel = require('../models/tarefa');
const TarefaService = require('../services/tarefaService');
const ProjetoModel = require('../models/projetos'); 
const TimeModel = require('../models/times'); 

exports.criarTarefa = async (req, res) => {
  try {

    console.log('Dados recebidos para criar tarefa:', req.body);
    console.log('ID do usuário na sessão:', req.session.userId);
    const dados = {
      ...req.body,
      user_id: req.session.userId 
    };

    const tarefa = await TarefaService.criarTarefa(dados);

    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(201).json(tarefa);
    }
    console.log('Tarefa criada com sucesso:', tarefa);
    res.redirect('/kanban');
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(500).json({ erro: error.message });
    }
    res.render('nova-tarefa', { 
      title: 'Nova Tarefa',
      error: error.message,
      projetos: await ProjetoModel.findAll(),
      times: await TimeModel.findAll()
    });

  }
};

exports.listarTarefas = async (req, res) => {
  try {

    const tarefas = await TarefaService.listarTarefas(req.session.userId);

    res.status(200).json(tarefas);
  } catch (err) {
    console.error('Erro ao listar tarefas:', err);
    res.status(500).json({ erro: err.message });
  }
};

exports.editarTarefa = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            title_tasks: req.body.title_tasks,
            description_tasks: req.body.description_tasks,
            status: req.body.status,
            priority: req.body.priority,
            team_id: req.body.team_id || null,
            project_id: req.body.project_id || null
        };

        const tarefa = await TarefaService.atualizarTarefa(id, updateData);

        return res.status(200).json({
            success: true,
            message: 'Tarefa atualizada com sucesso',
            data: tarefa
        });

    } catch (error) {
        console.error('Erro ao editar tarefa:', error);
        return res.status(500).json({ error: error.message });
    }
};

exports.excluirTarefa = async (req, res) => {
    try {
        const { id } = req.params;
        await TarefaModel.delete(id);

        if (req.xhr || req.headers.accept?.includes('application/json')) {
            return res.status(200).json({
                success: true,
                message: 'Tarefa excluída com sucesso'
            });
        }

        res.redirect('/kanban');

    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        
        if (req.xhr || req.headers.accept?.includes('application/json')) {
            return res.status(500).json({ error: error.message });
        }

        res.status(500).render('error', { error: 'Erro ao excluir tarefa' });
    }
};

exports.viewTarefas = async (req, res) => {
  try {
    const tarefas = await TarefaService.listarTarefas(req.session.userId);
    res.render('tarefas', { 
      title: 'Quadro Kanban',
      tarefas: tarefas || [],
      projetos: await ProjetoModel.findAll(),
      times: await TimeModel.findAll(),
      error: null
    });
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    res.render('tarefas', { 
      title: 'Quadro Kanban',
      tarefas: [],
      projetos: await ProjetoModel.findAll(),
      times: await TimeModel.findAll(),

      error: 'Erro ao carregar tarefas'
    });
  }
};

exports.viewEditar = async (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = await TarefaService.buscarPorId(id, req.session?.userId);
    const projetos = await ProjetoModel.findAll();
    const times = await TimeModel.findAll();

    return res.render('edita-tarefa', {
      title: 'Editar Tarefa',
      tarefa,
      projetos,
      times,
      error: null
    });
  } catch (error) {
    console.error('Erro ao carregar a tarefa para edição:', error);
    const projetos = await ProjetoModel.findAll();
    const times = await TimeModel.findAll();

    return res.status(500).render('edita-tarefa', {
      title: 'Editar Tarefa',
      tarefa: {},
      projetos,
      times,
      error: error.message
    });
  }
};

exports.viewTarefa = async (req, res) => {
    try {
        const { id } = req.params;
        const tarefa = await TarefaService.buscarPorId(id);
        
        if (!tarefa) {
            return res.status(404).render('error', {
                error: 'Tarefa não encontrada'
            });
        }

        res.render('visualizacao-tarefa', {
            tarefa,
            title: 'Visualizacao Tarefa'
        });
    } catch (error) {
        console.error('Erro ao visualizar tarefa:', error);
        res.status(500).render('error', {
            error: 'Erro ao carregar tarefa'
        });
    }
};

