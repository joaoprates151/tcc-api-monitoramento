const express = require('express')
const router = express.Router()

const LocalidadeController = require('../localidade')

router.get('/localidades', LocalidadeController.listarLocalidades)

module.exports = router