const express = require('express');
const router = express.Router();

const UsuarioController = require('../usuario');

router.get('/usuarios', UsuarioController.listarUsuarios);
router.post('/usuarios', UsuarioController.inserirUsuarios);
router.patch('/usuarios/:id', UsuarioController.atualizarUsuarios);
router.delete('/usuarios/:id', UsuarioController.excluirUsuarios);

const ColaboradorController = require('../colaborador');

router.get('/colaborador', ColaboradorController.listarColaborador);
router.post('/colaborador', ColaboradorController.inserirColaborador);
router.patch('/colaborador', ColaboradorController.atualizarColaborador);
router.delete('/colaborador', ColaboradorController.excluirColaborador);


const FuncaoController = require('../funcao');

router.get('/funcao', FuncaoController.listarFuncao);
router.post('/funcao', FuncaoController.inserirFuncao);
router.patch('/funcao', FuncaoController.atualizarFuncao);
router.delete('/funcao', FuncaoController.excluirFuncao);



module.exports = router;