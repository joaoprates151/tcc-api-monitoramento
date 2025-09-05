const express = require('express');
const router = express.Router();

// const UsuarioControler = require('../controllers/vistoria');
const ParametroControler = require('../controllers/parametro');
const TipoRuaControler = require('../controllers/tiporua');

router.get('/parametro', ParametroControler.listarParametro);

router.get('/tiporua', TipoRuaControler.listarTipoRua);
router.post('/tiporua', TipoRuaControler.cadastrarTipoRua);
router.patch('/tiporua/:ID_Tipo_Rua', TipoRuaControler.atualizarTipoRua);
router.delete('/tiporua/:ID_Tipo_Rua', TipoRuaControler.excluirTipoRua);

module.exports = router;

// clonado

