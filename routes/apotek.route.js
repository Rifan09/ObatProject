const express = require('express');
const router = express.Router();
const apotekController = require('../controllers/apotek.controllers');

router.get('/', apotekController.getApotek);

router.get('/terdekat', apotekController.getApotekTerdekat);

module.exports = router;