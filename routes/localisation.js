const path = require('path');

const express = require('express');

const localisationController = require('../controllers/localisation');

const router = express.Router();

router.get('/', localisationController.getLocalisations);
router.get('/:localisationId', localisationController.getLocalisation);
router.post('/', localisationController.createLocalisation);
router.delete('/:localisationId', localisationController.deleteLocalisation);
router.put('/:localisationId', localisationController.updateLocalisation);

module.exports = router;

