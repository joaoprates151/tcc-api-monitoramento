const express = require('express')
const router = express.Router()

const LocalidadeController = require('../localidade')
const VisitaController = require('../visita')
const Visita_itensController = require('../visita_item')
const Tipo_ruasController = require('../tipo_rua')
const Tipo_ocorrenciasController = require('../tipo_ocorrencia')
const SetoresController = require('../setor')
const PessoasController = require('../pessoa')

router.get('/localidades', LocalidadeController.listarLocalidades)
router.post('/localidades', LocalidadeController.inserirLocalidades)
router.patch('/localidades/:ID_localidade', LocalidadeController.atualizarLocalidades)
router.delete('/localidades/:ID_localidade', LocalidadeController.excluirLocalidades)


router.get('/visitas', VisitaController.listarVisitas)
router.post('/visitas', VisitaController.inserirVisitas)
router.patch('/visitas', VisitaController.atualizarVisitas)
router.delete('/visitas', VisitaController.excluirVisitas)

router.get('/visitas_itens', Visita_itensController.listarVisitas_itens)
router.post('/visitas_itens', Visita_itensController.inserirVisitas_itens)
router.patch('/visitas_itens', Visita_itensController.atualizarVisitas_itens)
router.delete('/visitas_itens', Visita_itensController.excluirVisitas_itens)

router.get('/tipo_ruas', Tipo_ruasController.listarTipo_ruas)
router.post('/tipo_ruas', Tipo_ruasController.InserirTipo_ruas)
router.patch('/tipo_ruas', Tipo_ruasController.atualizarTipo_ruas)
router.delete('/tipo_ruas', Tipo_ruasController.excluirTipo_ruas)

router.get('/tipo_ocorrencia', Tipo_ocorrenciasController.listarTipo_ocorrencias)
router.post('/tipo_ocorrencia', Tipo_ocorrenciasController.InserirTipo_ocorrencias)
router.patch('/tipo_ocorrencia', Tipo_ocorrenciasController.atualizarTipo_ocorrencias)
router.delete('/tipo_ocorrencia', Tipo_ocorrenciasController.excluirTipo_ocorrencias)

router.get('/setores', SetoresController.listarSetores)
router.post('/setores', SetoresController.inserirSetores)
router.patch('/setores', SetoresController.atualizarSetores)
router.delete('/setores', SetoresController.excluirSetores)

router.get('/pessoas', PessoasController.listarPessoas)
router.post('/pessoas', PessoasController.inserirPessoas)
router.patch('/pessoas/:ID_pessoa', PessoasController.atualizarPessoas)
router.delete('/pessoas', PessoasController.excluirPessoas)


module.exports = router