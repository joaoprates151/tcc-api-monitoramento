const express = require('express')
const router = express.Router()

const LocalidadeController = require('../localidade')

router.get('/localidades', LocalidadeController.listarLocalidades)
router.post('/localidades', LocalidadeController.inserirLocalidades)
router.patch('/localidades', LocalidadeController.atualizarLocalidades)
router.delete('/localidades', LocalidadeController.excluirLocalidades)

module.exports = router