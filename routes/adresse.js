const path = require('path');

const express = require('express');

const adresseController = require('../controllers/adresse');

const router = express.Router();

router.get('/', adresseController.getAdresses);

router.get('/:adresseId', adresseController.getAdresse);

router.post('/', adresseController.createAdresse);

router.delete('/:adresseId', adresseController.deleteAdresse);

router.put('/:adresseId', adresseController.updateAdresse);


module.exports = router;