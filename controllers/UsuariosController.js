const pool = require('../config/database');
const UsuarioModel = require('../models/usuario');
const bcrypt = require('bcrypt'); 

exports.listarUsuario = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.findAll();
        res.status(200).json(usuarios); 
    } catch (err) {
        console.error('Error listing users:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.criarUsuario = async (req, res) => {
    const { name_users, email, password } = req.body;

    try {
        const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const usuario = await UsuarioModel.create({ name_users, email, password });
        res.status(201).json(usuario);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { name_users, email, password } = req.body;

    try {
        const usuario = await UsuarioModel.atualizar(id, { name_users, email, password });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(usuario);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.excluirUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await UsuarioModel.delete(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: err.message });
    }
};