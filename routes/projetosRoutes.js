const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/ProjetoController');

router.get('/api/projetos', projetoController.listarProjetos);
router.post('/api/projetos/criar', projetoController.criarProjeto);
router.put('/api/projetos/edit/:id', projetoController.editarProjeto);
router.delete('/api/projetos/delete/:id', projetoController.excluirProjeto);

module.exports = router;
