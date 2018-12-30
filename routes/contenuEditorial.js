const express = require('express');

const contenuController = require('../controllers/contenuEditorial');

const router = express.Router();

router.get('/', contenuController.getContenus);
router.get('/:contenuId', contenuController.getContenu);
router.post('/', contenuController.createContenu);
router.delete('/:contenuId', contenuController.deleteContenu);
router.put('/:contenuId', contenuController.updateContenu);

module.exports = router;