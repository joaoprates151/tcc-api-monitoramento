const express = require('express');
const router = express.Router();

const BairroController = require('../controllers/bairro');

router.get('/bairro', BairroController.listarBairros);
router.post('/bairro', BairroController.inserirBairros);
router.patch('/bairro/:id', BairroController.atualizarBairros);
router.delete('/bairro/:id', BairroController.excluirBairros); 

const TabelaController = require('../controllers/tabela');

router.get('/tabela', TabelaController.listarTabelas);
router.post('/tabela', TabelaController.inserirTabelas);
router.patch('/tabela/:id', TabelaController.atualizarTabelas);
router.delete('/tabela/:id', TabelaController.excluirTabelas);

module.exports = router;