const express = require('express')
const router = express.Router()

const LocalidadeController = require('../controllers/localidade')
const VisitaController = require('../controllers/visita')
const Visita_itensController = require('../controllers/visita_item')
const Tipo_ocorrenciasController = require('../controllers/tipo_ocorrencia')
const SetoresController = require('../controllers/setor')
const PessoasController = require('../controllers/pessoa')
const RuasController = require('../controllers/rua')
const Unidade_saudeController = require('../controllers/unidade_saude')

router.get('/localidades', LocalidadeController.listarLocalidades)
router.post('/localidades', LocalidadeController.inserirLocalidades)
router.patch('/localidades/:ID_localidade', LocalidadeController.atualizarLocalidades)
router.delete('/localidades/:ID_localidade', LocalidadeController.excluirLocalidades)

router.get('/visitas', VisitaController.listarVisitas)
router.post('/visitas', VisitaController.inserirVisitas)
router.patch('/visitas/:ID_Visita', VisitaController.atualizarVisitas)
router.delete('/visitas/:ID_Visita', VisitaController.excluirVisitas)

router.get('/setores', SetoresController.listarSetores)
router.post('/setores', SetoresController.inserirSetores)
router.patch('/setores/:ID_Setor', SetoresController.atualizarSetores)
router.delete('/setores/:ID_Setor', SetoresController.excluirSetores)

router.get('/pessoas', PessoasController.listarPessoas)
router.post('/pessoas', PessoasController.inserirPessoas)
router.patch('/pessoas/:ID_pessoa', PessoasController.atualizarPessoas)
router.delete('/pessoas/:ID_pessoa', PessoasController.excluirPessoas)


router.get('/visita_itens', Visita_itensController.listarVisitas_itens)
router.post('/visita_itens', Visita_itensController.inserirVisitas_itens)
router.patch('/visita_itens/:ID_Visita_Item', Visita_itensController.atualizarVisitas_itens)
router.delete('/visita_itens/:ID_Visita_Item', Visita_itensController.excluirVisitas_itens)

router.get('/tipo_ocorrencia', Tipo_ocorrenciasController.listarTipo_ocorrencias)
router.post('/tipo_ocorrencia', Tipo_ocorrenciasController.InserirTipo_ocorrencias)
router.patch('/tipo_ocorrencia/:ID_Tipo_Ocorrencia', Tipo_ocorrenciasController.atualizarTipo_ocorrencias)
router.delete('/tipo_ocorrencia/:ID_Tipo_Ocorrencia', Tipo_ocorrenciasController.excluirTipo_ocorrencias)

router.get('/ruas', RuasController.listarRua)
router.post('/ruas', RuasController.inserirRua)
router.patch('/ruas/:ID_Rua', RuasController.atualizarRua)
router.delete('/ruas/:ID_Rua', RuasController.excluirRua)

router.get('/unidade_saude', Unidade_saudeController.listarUnidades_saude)
router.post('/unidade_saude', Unidade_saudeController.inserirUnidades_saude)
router.patch('/unidade_saude/:ID_Unidade_Saude', Unidade_saudeController.atualizarUnidades_saude)
router.delete('/unidade_saude/:ID_Unidade_Saude', Unidade_saudeController.excluirUnidades_saude)




module.exports = router