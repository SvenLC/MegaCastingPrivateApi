const express = require('express');

const isAuth = require('../middleware/isAuth');
const offreController = require('../controllers/offreCasting');

const router = express.Router();

router.get('/', offreController.getOffres);
router.get('/formated', offreController.getFormatedOffres);
router.get('/formated/:offreId', offreController.getFormatedOffresById);
router.get('/:offreId', offreController.getOffre);
router.post('/', offreController.createOffre);
router.delete('/:offreId', offreController.deleteOffre);
router.put('/:offreId', offreController.updateOffre);

module.exports = router;

