const express = require('express');

const offreController = require('../controllers/offreCasting');

const router = express.Router();

router.get('/', offreController.getOffres);
router.get('/:offreId', offreController.getOffre);
router.post('/', offreController.createOffre);
router.delete('/:offreId', offreController.deleteOffre);
router.put('/:offreId', offreController.updateOffre);

module.exports = router;

