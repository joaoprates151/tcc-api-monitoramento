const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuario');

router.get('/usuarios', UsuarioController.listarUsuarios);
router.post('/usuarios', UsuarioController.inserirUsuarios);
router.patch('/usuarios/:id', UsuarioController.atualizarUsuarios);
router.delete('/usuarios/:id', UsuarioController.excluirUsuarios);


const FuncaoController = require('../controllers/funcao');

router.get('/funcao', FuncaoController.listarFuncao);
router.post('/funcao', FuncaoController.inserirFuncao);
router.patch('/funcao', FuncaoController.atualizarFuncao);
router.delete('/funcao', FuncaoController.excluirFuncao);

const EnderecosController = require('../controllers/endereco');

router.get('/enderecos', EnderecosController.listarEndereco);
router.post('/enderecos', EnderecosController.inserirEndereco);
router.patch('/enderecos/:ID_Endereco', EnderecosController.atualizarEndereco);
router.delete('/enderecos/:ID_Endereco', EnderecosController.excluirEndereco);

module.exports = router;