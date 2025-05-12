const express = require('express');
const router = express.Router();

// const UsuarioControler = require('../controllers/vistoria');
const ParametroControler = require('../parametro');
const TipoRuaControler = require('../tiporua');

router.get('/parametro', ParametroControler.listarParametro);

router.get('/tiporua', TipoRuaControler.listarTipoRua);
router.post('/tiporua', TipoRuaControler.cadastrarTipoRua);
router.patch('/tiporua/:id_tipo_rua', TipoRuaControler.atualizarTipoRua);
router.delete('/tiporua/:id_tipo_rua', TipoRuaControler.excluirTipoRua);

module.exports = router;