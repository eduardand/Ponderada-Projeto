const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista de todos os usuários cadastrados na plataforma.
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_usuario:
 *                     type: integer
 *                   nome_completo:
 *                     type: string
 *                   email:
 *                     type: string
 *                   cidade:
 *                     type: string
 *                   estado:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     description: Retorna os detalhes de um usuário específico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
 *                   type: integer
 *                 nome_completo:
 *                   type: string
 *                 email:
 *                   type: string
 *                 cidade:
 *                   type: string
 *                 estado:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Adiciona um novo usuário à plataforma com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_completo:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *               senha:
 *                 type: string
 *               genero:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', async (req, res) => {
  const { nome_completo, cpf, email, data_nascimento, senha, genero, cidade, estado } = req.body;
  try {
    const newUser = await userService.createUser(
      nome_completo, cpf, email, data_nascimento, senha, genero, cidade, estado
    );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     description: Atualiza as informações de um usuário com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_completo:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *               senha:
 *                 type: string
 *               genero:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou malformados
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome_completo, cpf, email, data_nascimento, senha, genero, cidade, estado } = req.body;
  try {
    const updatedUser = await userService.updateUser(
      id, nome_completo, cpf, email, data_nascimento, senha, genero, cidade, estado
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     description: Exclui um usuário da plataforma com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser excluído
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
