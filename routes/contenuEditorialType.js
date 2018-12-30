const express = require('express');

const contenuTypeController = require('../controllers/contenuEditorialType');

const router = express.Router();

router.get('/:contenuTypeId', contenuTypeController.getContenuType);
router.get('/', contenuTypeController.getContenuTypes);
router.post('/', contenuTypeController.createContenuType);
router.delete('/:contenuTypeId', contenuTypeController.deleteContenuType);
router.put('/:contenuTypeId', contenuTypeController.updateContenuType);

module.exports = router;

