const pool = require('../config/database');
const TimeModel = require('../models/times');

exports.listarTimes = async (req, res) => {
    try {
        const times = await TimeModel.findAll();

        if (req && (req.xhr || req.headers?.accept?.includes('application/json'))) {
            return res.status(200).json(times);
        }

        return times;

    } catch (error) {
        console.error('Erro ao listar times:', error);
        if (req && res) {
            return res.status(500).json({ error: error.message });
        }
        throw error;
    }
};

exports.criarTime = async (req, res) => {
    try {
        const { name_teams, description } = req.body;
        
        if (!name_teams || name_teams.trim() === '') {
            return res.status(400).render('novo-time', {
                error: 'Nome do time é obrigatório',
                title: 'Criar Novo Time'
            });
        }

        const time = await TimeModel.criar({ name_teams, description });

        if (req.xhr || req.headers.accept?.includes('application/json')) {
            return res.status(201).json({
                success: true,
                message: 'Time criado com sucesso',
                time
            });
        }

        res.redirect('/kanban');
    } catch (error) {
        console.error('Erro ao criar time:', error);
        res.status(500).render('novo-time', {
            error: 'Erro ao criar time',
            title: 'Criar Novo Time'
        });
    }
};

exports.editarTime = async (req, res) => {
    try {
        const { id } = req.params;
        const time = await TimeModel.atualizar(id, req.body);
        res.json(time);
    } catch (error) {
        console.error('Erro ao editar time:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.excluirTime = async (req, res) => {
    try {
        const { id } = req.params;
        await TimeModel.delete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir time:', error);
        res.status(500).json({ error: error.message });
    }
};
