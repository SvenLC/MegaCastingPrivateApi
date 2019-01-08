const express = require('express');

const partenaireController = require('../controllers/partenaire');

const router = express.Router();

router.get('/', partenaireController.getPartenaires);
router.get('/:partenaireId', partenaireController.getPartenaire);
router.get('/findByLogin/:partenaireLogin', partenaireController.getPartenaireByLogin);
router.post('/', partenaireController.createPartenaire);
router.delete('/:partenaireId', partenaireController.deletePartenaire);
router.put('/:partenaireId', partenaireController.updatePartenaire);

module.exports = router;

