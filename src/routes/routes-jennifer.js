const express = require('express');
const router = express.Router();

const BairroController = require('../controllers/bairro');

router.get('/bairro', BairroController.listarBairros);
router.post('/bairro/:id', BairroController.atualizarBairros);
router.patch('/bairro', BairroController.inserirBairros);
router.delete('/bairro/:id', BairroController.excluirBairros); //params
 
module.exports = router;