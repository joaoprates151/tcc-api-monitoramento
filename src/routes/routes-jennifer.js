const express = require('express');
const router = express.Router();

const BairroController = require('../controllers/bairro');

router.get('/bairro', BairroController.listarBairros);
router.post('/bairro', BairroController.inserirBairros);
router.patch('/bairro/:id', BairroController.atualizarBairros);
router.delete('/bairro/:id', BairroController.excluirBairros); 
 
module.exports = router;

// clonado