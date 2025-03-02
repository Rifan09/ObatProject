const express = require('express');
const router = express.Router();
const SirekController = require('../controllers/sirek.controllers');

// Halaman Sirek
router.get('/', SirekController.getSirek);

// Proses Sirek
router.post('/predict', SirekController.createSirek);

module.exports = router;
