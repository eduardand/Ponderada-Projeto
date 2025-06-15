const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt'); 

class AuthController {
    static async renderLogin(req, res) {
        res.render('login', { error: null }); 
    }

    static async renderCadastro(req, res) {
        res.render('cadastro', { error: null }); 

    }

    static async cadastrar(req, res) {
        try {
            const { name_users, email, password } = req.body;

            if (!name_users || !email || !password) {

                return res.render('cadastro', {
                    error: 'Todos os campos são obrigatórios'
                });
            }

            const usuarioExistente = await Usuario.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.render('cadastro', { 
                    error: 'Email já cadastrado' 
                });
            }

            if (password.length < 6) {
                return res.status(400).render('cadastro', {
                    error: 'A senha deve ter pelo menos 6 caracteres'
                });
            }

            const hashedPassword = await bcrypt.hash(String(password), 10);
            await Usuario.create({ name_users, email, password: hashedPassword });
            
            res.redirect('/auth/login');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            res.render('cadastro', { 

                error: 'Erro ao cadastrar usuário' 
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const usuario = await Usuario.buscarPorEmail(email);
            if (!usuario) {
                return res.render('login', { error: 'Email ou senha incorretos' });
            }

            if (!password || !usuario.password) {
                return res.render('login', { error: 'Email ou senha incorretos' });
            }

            const senhaValida = await bcrypt.compare(String(password), usuario.password);

            if (!senhaValida) {
                return res.render('login', { error: 'Email ou senha incorretos' });
            }

            req.session.userId = usuario.id;
            req.session.userEmail = usuario.email;
            res.redirect('/kanban');

        } catch (error) {
            console.error('Login error:', error);
            res.render('login', { error: 'Erro ao fazer login' });
        }
    }

    static async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao fazer logout:', err);
                return res.status(500).json({ error: 'Erro ao fazer logout' });
            }
            
            res.redirect('/login');
        });
    }
}

module.exports = AuthController;