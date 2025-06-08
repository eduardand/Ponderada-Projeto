const pool = require('../config/database');
const TimeProjetoModel = require('../models/timesProjetos');

exports.atribuirProjetoAoTime = async (req, res) => {
  const { time_id, projeto_id } = req.body;

  try {
    const timeExiste = await pool.query('SELECT id FROM teams WHERE id = $1', [time_id]);
    if (timeExiste.rows.length === 0) {
      return res.status(404).json({ erro: 'Time não encontrado' });
    }

    const projetoExiste = await pool.query('SELECT id FROM projects WHERE id = $1', [projeto_id]);
    if (projetoExiste.rows.length === 0) {
      return res.status(404).json({ erro: 'Projeto não encontrado' });
    }

    const resultado = await TimeProjetoModel.criar(time_id, projeto_id);
    res.status(201).json(resultado);
  } catch (err) {
    if (err.message === 'Este projeto já está atribuído a este time') {
      return res.status(400).json({ erro: err.message });
    }
    res.status(500).json({ erro: err.message });
  }
};

exports.listarProjetosDoTime = async (req, res) => {
  const { time_id } = req.params;

  try {
    const projetos = await TimeProjetoModel.buscarPorTime(time_id);
    res.status(200).json(projetos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarTimesDoProjeto = async (req, res) => {
  const { projeto_id } = req.params;

  try {
    const times = await TimeProjetoModel.buscarPorProjeto(projeto_id);
    res.status(200).json(times);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.removerProjetoDoTime = async (req, res) => {
  const { time_id, projeto_id } = req.params;

  try {
    const resultado = await TimeProjetoModel.remover(time_id, projeto_id);
    if (!resultado) {
      return res.status(404).json({ mensagem: 'Relação não encontrada' });
    }
    res.status(200).json({ mensagem: 'Projeto removido do time com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};