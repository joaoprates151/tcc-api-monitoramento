const express = require('express');
const router = express.Router();

// ===== CONTROLLERS =====
const BairroController = require('../controllers/bairro');
const TabelaController = require('../controllers/tabela');
const UsuarioController = require('../controllers/usuario');
const FuncaoController = require('../controllers/funcao');
const EnderecosController = require('../controllers/endereco');
const LocalidadeController = require('../controllers/localidade');
const VisitaController = require('../controllers/visita');
const Visita_itensController = require('../controllers/visita_item');
const Tipo_ocorrenciasController = require('../controllers/tipo_ocorrencia');
const SetoresController = require('../controllers/setor');
const PessoasController = require('../controllers/pessoa');
const RuasController = require('../controllers/rua');
const Unidade_saudeController = require('../controllers/unidade_saude');
const ParametroControler = require('../controllers/parametro');
const TipoRuaControler = require('../controllers/tiporua');
const DashboardController = require('../controllers/dashboard');

// ===== DASHBOARD =====
router.get('/dashboard/metricas/:id_usuario', DashboardController.getMetricasAgente);
router.get('/dashboard/agente/:id_usuario', DashboardController.getDadosAgente);

// ===== BAIRRO =====
router.get('/bairro', BairroController.listarBairros);
router.post('/bairro', BairroController.inserirBairros);
router.patch('/bairro/:id', BairroController.atualizarBairros);
router.delete('/bairro/:id', BairroController.excluirBairros);

// ===== TABELA =====
router.get('/tabela', TabelaController.listarTabelas);
router.post('/tabela', TabelaController.inserirTabelas);
router.patch('/tabela/:id', TabelaController.atualizarTabelas);
router.delete('/tabela/:id', TabelaController.excluirTabelas);

// ===== USUÁRIO =====
router.get('/usuarios', UsuarioController.listarUsuarios);
router.post('/usuarios', UsuarioController.inserirUsuarios);
router.patch('/usuarios/:id', UsuarioController.atualizarUsuarios);
router.delete('/usuarios/:id', UsuarioController.excluirUsuarios);
router.post('/login', UsuarioController.login);

// ===== FUNÇÃO =====
router.get('/funcao', FuncaoController.listarFuncao);
router.post('/funcao', FuncaoController.inserirFuncao);
router.patch('/funcao/:id', FuncaoController.atualizarFuncao);
router.delete('/funcao/:id', FuncaoController.excluirFuncao);

// ===== ENDEREÇOS =====
router.get('/enderecos', EnderecosController.listarEndereco);
router.post('/enderecos', EnderecosController.inserirEndereco);
router.patch('/enderecos/:ID_Endereco', EnderecosController.atualizarEndereco);
router.delete('/enderecos/:ID_Endereco', EnderecosController.excluirEndereco);

// ===== LOCALIDADE =====
router.get('/localidades', LocalidadeController.listarLocalidades);
router.post('/localidades', LocalidadeController.inserirLocalidades);
router.patch('/localidades/:ID_localidade', LocalidadeController.atualizarLocalidades);
router.delete('/localidades/:ID_localidade', LocalidadeController.excluirLocalidades);

// ===== VISITA =====
router.get('/visitas', VisitaController.listarVisitas);
router.post('/visitas', VisitaController.inserirVisitas);
router.patch('/visitas/:ID_Visita', VisitaController.atualizarVisitas);
router.delete('/visitas/:ID_Visita', VisitaController.excluirVisitas);

// ===== SETORES =====
router.get('/setores', SetoresController.listarSetores);
router.post('/setores', SetoresController.inserirSetores);
router.patch('/setores/:ID_Setor', SetoresController.atualizarSetores);
router.delete('/setores/:ID_Setor', SetoresController.excluirSetores);

// ===== PESSOAS =====
router.get('/pessoas', PessoasController.listarPessoas);
router.post('/pessoas', PessoasController.inserirPessoas);
router.patch('/pessoas/:ID_Pessoa', PessoasController.atualizarPessoas);
router.delete('/pessoas/:ID_Pessoa', PessoasController.excluirPessoas);

// ===== VISITA ITENS =====
router.get('/visita_itens', Visita_itensController.listarVisitas_itens);
router.post('/visita_itens', Visita_itensController.inserirVisitas_itens);
router.patch('/visita_itens/:ID_Visita_Item', Visita_itensController.atualizarVisitas_itens);
router.delete('/visita_itens/:ID_Visita_Item', Visita_itensController.excluirVisitas_itens);

// ===== TIPO OCORRÊNCIA =====
router.get('/tipo_ocorrencia', Tipo_ocorrenciasController.listarTipo_ocorrencias);
router.post('/tipo_ocorrencia', Tipo_ocorrenciasController.inserirTipo_ocorrencias);
router.patch('/tipo_ocorrencia/:ID_Tipo_Ocorrencia', Tipo_ocorrenciasController.atualizarTipo_ocorrencias);
router.delete('/tipo_ocorrencia/:ID_Tipo_Ocorrencia', Tipo_ocorrenciasController.excluirTipo_ocorrencias);

// ===== RUAS =====
router.get('/ruas', RuasController.listarRua);
router.post('/ruas', RuasController.inserirRua);
router.patch('/ruas/:ID_Rua', RuasController.atualizarRua);
router.delete('/ruas/:ID_Rua', RuasController.excluirRua);

// ===== UNIDADE SAÚDE =====
router.get('/unidade_saude', Unidade_saudeController.listarUnidades_saude);
router.post('/unidade_saude', Unidade_saudeController.inserirUnidades_saude);
router.patch('/unidade_saude/:ID_Unidade_Saude', Unidade_saudeController.atualizarUnidades_saude);
router.delete('/unidade_saude/:ID_Unidade_Saude', Unidade_saudeController.excluirUnidades_saude);

// ===== PARÂMETRO =====
router.get('/parametro', ParametroControler.listarParametro);

// ===== TIPO RUA =====
router.get('/tiporua', TipoRuaControler.listarTipoRua);
router.post('/tiporua', TipoRuaControler.cadastrarTipoRua);
router.patch('/tiporua/:ID_Tipo_Rua', TipoRuaControler.atualizarTipoRua);
router.delete('/tiporua/:ID_Tipo_Rua', TipoRuaControler.excluirTipoRua);

module.exports = router;