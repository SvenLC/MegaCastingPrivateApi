const express = require('express');

const metierController = require('../controllers/metier');

const router = express.Router();

router.get('/', metierController.getMetiers);
router.get('/:metierId', metierController.getMetier);
router.post('/', metierController.createMetier);
router.delete('/:metierId', metierController.deleteMetier);
router.put('/:metierId', metierController.updateMetier);

module.exports = router;

