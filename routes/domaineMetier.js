const express = require('express');

const domaineMetierController = require('../controllers/domaineMetier');

const router = express.Router();

router.get('/', domaineMetierController.getDomaineMetiers);
router.get('/:domaineMetierId', domaineMetierController.getDomaineMetier);
router.post('/', domaineMetierController.createDomaineMetier);
router.delete('/:domaineMetierId', domaineMetierController.deleteDomaineMetier);
router.put('/:domaineMetierId', domaineMetierController.updateDomaineMetier);

module.exports = router;

