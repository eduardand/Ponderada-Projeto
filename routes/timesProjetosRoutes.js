const express = require('express');
const router = express.Router();
const TimeProjetoController = require('../controllers/TimeProjetoController');

router.post('/times-projetos', TimeProjetoController.atribuirProjetoAoTime);
router.get('/times-projetos/time/:time_id', TimeProjetoController.listarProjetosDoTime);
router.get('/times-projetos/projeto/:projeto_id', TimeProjetoController.listarTimesDoProjeto);
router.delete('/times-projetos/:time_id/:projeto_id', TimeProjetoController.removerProjetoDoTime);

module.exports = router;