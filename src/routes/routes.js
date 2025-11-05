const express = require('express')
const router = express.Router()

const routerPrates = require('./routes-prates')
const routerJennifer = require('./routes-jennifer')
const routerLidia = require('./routes-lidia')
const routerTakeo = require('./routes-takeo')


router.use(routerPrates)
router.use(routerJennifer)
router.use(routerLidia)
router.use(routerTakeo)

module.exports = router;