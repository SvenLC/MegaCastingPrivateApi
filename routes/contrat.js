const express = require('express');

const contratController = require('../controllers/contrat');

const router = express.Router();

router.get('/:contratId', contratController.getContrat);
router.get('/', contratController.getContrats);
router.post('/', contratController.createContrat);
router.delete('/:contratId', contratController.deleteContrat);
router.put('/:contratId', contratController.updateContrat);

module.exports = router;