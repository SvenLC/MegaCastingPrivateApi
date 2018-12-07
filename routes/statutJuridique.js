const path = require('path');

const express = require('express');

const statutJuridiqueController = require('../controllers/statutJuridique');

const router = express.Router();

router.get('/', statutJuridiqueController.getStatutJuridiques);
router.get('/:statutJuridiqueId', statutJuridiqueController.getStatutJuridique);
router.post('/', statutJuridiqueController.createStatutJuridique);
router.delete('/:statutJuridiqueId', statutJuridiqueController.deleteStatutJuridique);
router.put('/:statutJuridiqueId', statutJuridiqueController.updateStatutJuridique);

module.exports = router;

