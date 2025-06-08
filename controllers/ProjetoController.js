const pool = require('../config/database');
const ProjetoModel = require('../models/projetos');

exports.criarProjeto = async (req, res) => {
  try {
    const { name_projects, description_projects, team_id } = req.body;


    if (!name_projects || name_projects.trim() === '') {
      return res.status(400).json({ error: 'Nome do projeto é obrigatório' });
    }
    
    const projeto = await ProjetoModel.criar({
      name_projects,
      description_projects,
      team_id
    });

    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(201).json({ 
        success: true, 
        message: 'Projeto criado com sucesso',
        projeto 
      });
    }

    res.redirect('/kanban');

  } catch (err) {
    console.error('Erro ao criar projeto:', err);
    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(500).json({ error: err.message });
    }
    res.status(500).render('novo-projeto', { 
      title: 'Novo Projeto',
      error: err.message
    });
  }
};

exports.listarProjetos = async (req, res) => {
  try {
    const projetos = await ProjetoModel.findAll();
    console.log('Projetos encontrados:', projetos);
    return projetos;
  } catch (err) {
    console.error('Erro ao listar projetos:', err);
    throw err;
  }
};

exports.editarProjeto = async (req, res) => {
  const { id } = req.params;
  const { name_projects, description_projects, color_projects } = req.body;

  const query = `
    UPDATE projects 
    SET name_projects = $1,
        description_projects = $2,
        color_projects = $3
    WHERE id = $4
    RETURNING *`;
  const values = [name_projects, description_projects, color_projects, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirProjeto = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM projects WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }
    res.status(200).json({ message: 'Projeto excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.viewProjetos = async (req, res) => {
  try {
    const projetos = await ProjetoModel.listarProjeto();
    res.render('projetos', { 
      title: 'Projetos',
      projetos: projetos
    });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).render('error', { 
      title: 'Erro',
      error: 'Erro ao carregar projetos'
    });
  }
};