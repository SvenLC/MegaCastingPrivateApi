const express = require('express');

const codePostalController = require('../controllers/codePostal');

const router = express.Router();

router.get('/', codePostalController.getCodePostals);
router.get('/:codePostalId', codePostalController.getCodePostal);


module.exports = router;
