const express = require('express');
const router = express.Router();
const timeController = require('../controllers/TimeController');

router.get('/times', timeController.listarTimes);
router.post('/time/criar', timeController.criarTime);
router.put('/time/edit/:id', timeController.editarTime);
router.delete('/time/delete/:id', timeController.excluirTime);

module.exports = router;