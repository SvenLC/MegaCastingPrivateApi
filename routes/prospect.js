const path = require('path');

const express = require('express');

const prospectController = require('../controllers/prospect');

const router = express.Router();

router.get('/:prospectId', prospectController.getProspect);

router.get('/', prospectController.getProspects);

module.exports = router;