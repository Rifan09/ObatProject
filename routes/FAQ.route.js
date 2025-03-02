const express = require('express');
const router = express.Router();
const FAQController = require('../controllers/FAQ.controllers');


// Halaman Sirek
router.get('/', FAQController.getFAQ);

module.exports = router;